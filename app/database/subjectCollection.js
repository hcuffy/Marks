/* eslint-disable no-underscore-dangle */
import {
	saveSuccessful,
	updateSuccessful,
	saveFailed,
	entryAlreadyExists,
	unableToRetrieve,
	deletionFailed,
	updateFailed
} from '../notifications/general'
import {
	getClassroomData,
	updateSubjectArray,
	updateClassSubjectArray
} from './classroomCollection'
import { getAllExams, deleteExam } from './examCollection'

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

const getSubjects = async ({ room, abbreviation }) => {
	const data = await getClassroomData()
	const selectedClass = _.find(data, ['name', room])
	if (_.includes(selectedClass.subjects, abbreviation)) {
		return true
	}

	return selectedClass
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

export const addSubjectData = async data => {
	const subjectClassroom = await getSubjects(data)

	if (subjectClassroom === true) {
		entryAlreadyExists()

		return
	}

	const newSubject = _.merge(data, {
		tests: [],
		classroomId: subjectClassroom._id
	})
	subjectClassroom.subjects.push(data.abbreviation)

	subjectCollection.insert(newSubject, error => {
		if (error) {
			saveFailed()

			return error
		}
		updateSubjectArray(subjectClassroom)
		saveSuccessful()
	})
	const allSubjects = await getAllSubjects()

	return allSubjects
}

const filteredExams = async subjectId => _.filter(await getAllExams(), { subjectId })

const deleteExamsBySubject = async subjectId => {
	const exams = await filteredExams(subjectId)

	if (!_.isEmpty(exams)) {
		_.forEach(exams, exam => {
			deleteExam({ examId: exam._id, subjectId })
		})
	}
}

export const deleteSubject = ({ id }) =>
	new Promise((resolve, reject) =>
		subjectCollection.remove({ _id: id }, err => {
			if (err) {
				deletionFailed()

				return reject(err)
			}
			filteredExams(id)
			subjectCollection.find({}, (error, docs) => {
				if (err) {
					deletionFailed()

					return reject(err)
				}
				deleteExamsBySubject(id)

				return resolve(docs)
			})
		})
	)

const checkSubjectChanges = (prev, curr) => {
	const { name, abbreviation } = curr
	if (_.isEqual(prev.name, name) && _.isEqual(prev.abbreviation, abbreviation)) {
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
	const { name, abbreviation } = current
	const { room, tests, classroomId } = previous

	const subjectUpdatable = checkSubjectChanges(previous, current)
	if (subjectUpdatable) {
		updateClassroomSubjects(classroomId, previous.abbreviation, abbreviation)
		subjectCollection.update(
			{ _id: previous._id },
			{
				name,
				abbreviation,
				room,
				tests,
				classroomId
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
		subjectCollection.find({ _id: data.subjectId }, (err, entry) => {
			if (err) {
				updateFailed()

				return err
			}
			if (entry.length > 0) {
				updateSinlgeSubject(entry[0], data)
				subjectCollection.find({ _id: data.subjectId }, (error, docs) => {
					if (error) {
						updateFailed()

						return reject(error)
					}

					return resolve(docs)
				})
			}
		})
	)

export const addExamToSubjectArray = ({ subjectId, title }) => {
	subjectCollection.find({ _id: subjectId }, (err, doc) => {
		if (err) {
			unableToRetrieve()

			return err
		}
		if (doc.length <= 0) {
			return 'Exists'
		}

		if (!_.includes(doc.tests, title)) {
			subjectCollection.update(
				{ _id: subjectId },
				{ $push: { tests: title } },
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
					{ $pull: { tests: examTitle } },
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
