/* eslint-disable no-underscore-dangle */
import {
	saveSuccessful,
	updateSuccessful,
	saveError,
	entryAlreadyExists,
	unableToRetrieve,
	deleteSubjectFailed,
	deleteSuccessful,
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
const subjectCollection = new Datastore({
	filename: path.join(userDataPath, 'subject.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

async function getSubjects(subjectData) {
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
			saveError()
			return error
		}
		updateSubjectArray(newRoom)
		saveSuccessful()
		return doc
	})
}

export const getAllSubjects = () =>
	new Promise((resolve, reject) =>
		subjectCollection.find({}, (err, entry) => {
			if (err) {
				unableToRetrieve()
				return reject(err)
			}
			return resolve(entry)
		})
	)

export const deleteSubject = data =>
	new Promise((resolve, reject) =>
		subjectCollection.remove({ _id: data.id }, err => {
			if (err) {
				deleteSubjectFailed()
				return reject(err)
			}
			subjectCollection.find({}, (error, docs) => {
				if (err) {
					deleteSubjectFailed()
					return reject(err)
				}
				deleteSuccessful()
				return resolve(docs)
			})
		})
	)

function checkSubjectChanges(prev, curr) {
	const { Name, Abbreviation } = curr
	if (_.isEqual(prev.Name, Name) && _.isEqual(prev.Abbreviation, Abbreviation)) {
		return false
	}
	return true
}

function updateClassroomSubjects(subjectId, previousSubject, currentSubject) {
	if (!_.isEqual(previousSubject, currentSubject)) {
		console.log('here')
		updateClassSubjectArray(subjectId, previousSubject, currentSubject)
	}
}

function updateSinlgeSubject(previous, current) {
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
