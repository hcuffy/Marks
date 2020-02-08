import {
	saveSuccessful,
	saveFailed,
	unableToRetrieve,
	entryAlreadyExists,
	deletionFailed,
	updateSuccessful,
	updateFailed
} from '../notifications/general'
import { getAllSubjects, deleteSubject } from './subject'

const _ = require('lodash')
const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')
const fs = require('fs')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')

if (!fs.existsSync(collectionsPath)) {
	fs.mkdirSync(collectionsPath)
}

const Classroom = new Datastore({
	filename: path.join(collectionsPath, 'classroom.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const addClassroomData = data => {
	Classroom.find({ name: data.name }, (err, entry) => {
		if (err) {
			saveFailed()
		}
		if (entry.length > 0) {
			entryAlreadyExists()
		}

		const newData = data
		newData.subjects = []

		Classroom.insert(newData, (error, doc) => {
			if (error) {
				saveFailed()
			}
			saveSuccessful()

			return doc
		})
	})
}

export const getClassroomData = () =>
	new Promise(resolve =>
		Classroom.find({}, (err, entry) => {
			if (err) {
				unableToRetrieve()
			}

			return resolve(entry)
		})
	)

const filteredSubjects = async classroomId =>
	_.filter(await getAllSubjects(), { classroomId })

const deleteSubjectByClassroom = async classroomId => {
	const subjects = await filteredSubjects(classroomId)

	if (!_.isEmpty(subjects)) {
		_.forEach(subjects, subject => {
			deleteSubject({ classroomId: subject._id })
		})
	}
}

export const deleteClassroom = ({ id }) =>
	new Promise(resolve =>
		Classroom.remove({ _id: id }, err => {
			if (err) {
				deletionFailed()
			}
			Classroom.find({}, (error, docs) => {
				if (error) {
					deletionFailed()
				}

				deleteSubjectByClassroom(id)

				return resolve(docs)
			})
		})
	)

const checkSubject = checkingCurrent => {
	if (_.isNil(checkingCurrent.subjects)) {
		return false
	}
	if (checkingCurrent.subjects.length > 0) {
		return true
	}
}

const updateSingleClassroom = (previous, current) => {
	const { name, teacher, substitute } = current
	const { subjects } = previous

	if (checkSubject(current) === true) {
		subjects.push(current.subjects[0])
	}

	Classroom.update(
		{ name: previous.name },
		{
			name,
			teacher,
			substitute,
			subjects
		},
		{},
		err => {
			if (err) {
				updateFailed()
			}
			updateSuccessful()
		}
	)
}

export const updateRoomData = data =>
	new Promise(resolve =>
		Classroom.find({ name: data.oldName }, (err, entry) => {
			if (err) {
				updateFailed()
			}
			if (entry.length > 0) {
				updateSingleClassroom(entry[0], data)
				Classroom.find({}, (error, docs) => {
					if (error) {
						updateFailed()
					}

					return resolve(docs)
				})
			}
		})
	)

export const updateSubjectArray = data => {
	Classroom.find({ name: data.name }, (err, entry) => {
		if (err) {
			updateFailed()
		}
		if (entry.length > 0) {
			updateSingleClassroom(entry[0], data)
			Classroom.find({}, (error, docs) => {
				if (error) {
					updateFailed()
				}

				return docs
			})
		}
	})
}

export const updateClassSubjectArray = (
	classroomId,
	oldSubject,
	newSubject
) => {
	Classroom.update(
		{ _id: classroomId },
		{ $push: { subjects: newSubject } },
		{},
		err => {
			if (err) {
				updateFailed()
			}
		}
	)

	Classroom.update(
		{ _id: classroomId },
		{ $pull: { subjects: oldSubject } },
		{},
		err => {
			if (err) {
				updateFailed()
				return
			}
		}
	)
}
