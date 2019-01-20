/* eslint-disable no-underscore-dangle */
import {
	saveSuccessful,
	updateSuccessful,
	saveFailed,
	entryAlreadyExists,
	unableToRetrieve,
	deletionFailed,
	deletionSuccessful,
	updateFailed
} from '../notifications/general'
import {
	getClassroomData,
	updateSubjectArray,
	updateClassSubjectArray
} from './classroomCollection'

const _ = require('lodash')
const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')
const subjectCollection = new Datastore({
	filename: path.join(collectionsPath, 'subject.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

const getSubjects = async subjectData => {
	const data = await getClassroomData()
	const selectedClass = _.find(data, ['Name', subjectData.Room])
	if (!_.includes(selectedClass.Subjects, subjectData.Abbreviation)) {
		return selectedClass
	}
	return true
}

export const addSubjectData = async data => {
	const newRoom = await getSubjects(data)

	if (newRoom === true) {
		entryAlreadyExists()
		return -1
	}

	const newSubject = _.merge(data, { Tests: [], ClassroomId: newRoom._id })
	newRoom.Subjects.push(data.Abbreviation)

	subjectCollection.insert(newSubject, (error, doc) => {
		if (error) {
			saveFailed()
			return error
		}
		updateSubjectArray(newRoom)
		saveSuccessful()
		return doc
	})
}

export const getAllSubjects = () =>
	new Promise((resolve, reject) =>
		subjectCollection.find({}, (err, docs) => {
			if (err) {
				unableToRetrieve()
				return reject(err)
			}
			return resolve(docs)
		})
	)

export const deleteSubject = data =>
	new Promise((resolve, reject) =>
		subjectCollection.remove({ _id: data.id }, err => {
			if (err) {
				deletionFailed()
				return reject(err)
			}
			subjectCollection.find({}, (error, docs) => {
				if (err) {
					deletionFailed()
					return reject(err)
				}
				deletionSuccessful()
				return resolve(docs)
			})
		})
	)

const checkSubjectChanges = (prev, curr) => {
	const { Name, Abbreviation } = curr
	if (_.isEqual(prev.Name, Name) && _.isEqual(prev.Abbreviation, Abbreviation)) {
		return false
	}
	return true
}

const updateClassroomSubjects = (subjectId, previousSubject, currentSubject) => {
	if (!_.isEqual(previousSubject, currentSubject)) {
		updateClassSubjectArray(subjectId, previousSubject, currentSubject)
	}
}

const updateSinlgeSubject = (previous, current) => {
	const { Name, Abbreviation } = current
	const { Room, Tests, ClassroomId } = previous

	const subjectUpdatable = checkSubjectChanges(previous, current)
	if (subjectUpdatable) {
		updateClassroomSubjects(ClassroomId, previous.Abbreviation, Abbreviation)
		subjectCollection.update(
			{ _id: previous._id },
			{
				Name,
				Abbreviation,
				Room,
				Tests,
				ClassroomId
			},
			{},
			err => {
				if (err) {
					updateFailed()
					return err
				}
				updateSuccessful()
			}
		)
	}
}

export const updateSubjectData = data =>
	new Promise((resolve, reject) =>
		subjectCollection.find({ _id: data.SubjectId }, (err, entry) => {
			if (err) {
				updateFailed()
				return err
			}
			if (entry.length > 0) {
				updateSinlgeSubject(entry[0], data)
				subjectCollection.find({ _id: data.SubjectId }, (error, docs) => {
					if (error) {
						updateFailed()
						return reject(error)
					}
					return resolve(docs)
				})
			}
		})
	)

export const addExamToSubjectArray = ({ SubjectId, Title }) => {
	console.log(SubjectId)
	subjectCollection.find({ _id: SubjectId }, (err, doc) => {
		if (err) {
			unableToRetrieve()
			return err
		}
		console.log(doc)
		if (doc.length <= 0) {
			return 'Exists'
		}

		if (!_.includes(doc.Tests, Title)) {
			subjectCollection.update(
				{ _id: SubjectId },
				{ $push: { Tests: Title } },
				{},
				error => {
					if (error) {
						updateFailed()
						return error
					}
				}
			)
		}
	})
}
export const updateSubjecTestsArray = (subjectId, examTitle) =>
	new Promise((resolve, reject) =>
		subjectCollection.find({ _id: subjectId }, (err, entry) => {
			if (err) {
				updateFailed()
				return err
			}
			if (entry.length > 0) {
				subjectCollection.update(
					{ _id: subjectId },
					{ $pull: { Tests: examTitle } },
					{},
					(error, docs) => {
						if (error) {
							updateFailed()
							return reject(error)
						}
						return resolve(docs)
					}
				)
			}
		})
	)
