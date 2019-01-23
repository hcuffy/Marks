import {
	saveSuccessful,
	saveFailed,
	unableToRetrieve,
	entryAlreadyExists,
	deletionSuccessful,
	deletionFailed,
	updateSuccessful,
	updateFailed
} from '../notifications/general'

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

const classroomCollection = new Datastore({
	filename: path.join(collectionsPath, 'classroom.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const addClassroomData = data => {
	classroomCollection.find({ Name: data.Name }, (err, entry) => {
		if (err) {
			saveFailed()
			return err
		}
		if (entry.length > 0) {
			entryAlreadyExists()
			return
		}
		const newData = data
		newData.Subjects = []
		classroomCollection.insert(newData, (error, doc) => {
			if (error) {
				saveFailed()
				return error
			}
			saveSuccessful()
			return doc
		})
	})
}

export const getClassroomData = () =>
	new Promise((resolve, reject) =>
		classroomCollection.find({}, (err, entry) => {
			if (err) {
				unableToRetrieve()
				return reject(err)
			}
			return resolve(entry)
		})
	)

export const deleteClassroom = data =>
	new Promise((resolve, reject) =>
		classroomCollection.remove({ _id: data.id }, err => {
			if (err) {
				deletionFailed()
				return reject(err)
			}
			classroomCollection.find({}, (error, docs) => {
				if (err) {
					deletionFailed()
					return reject(err)
				}
				deletionSuccessful()
				return resolve(docs)
			})
		})
	)

const checkSubject = checkingCurrent => {
	if (_.isNil(checkingCurrent.Subjects)) {
		return false
	}
	if (checkingCurrent.Subjects.length > 0) {
		return true
	}
}

const updateSinlgeClassroom = (previous, current) => {
	const { Name, Teacher, Code, Subject_Teacher } = current
	const { Subjects } = previous

	if (checkSubject(current) === true) {
		Subjects.push(current.Subjects[0])
	}

	classroomCollection.update(
		{ Name: previous.Name },
		{
			Name,
			Teacher,
			Code,
			Subject_Teacher,
			Subjects
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

export const updateRoomData = data =>
	new Promise((resolve, reject) =>
		classroomCollection.find({ Name: data.OldName }, (err, entry) => {
			if (err) {
				updateFailed()
				return err
			}
			if (entry.length > 0) {
				updateSinlgeClassroom(entry[0], data)
				classroomCollection.find({}, (error, docs) => {
					if (error) {
						updateFailed()
						return reject(error)
					}
					return resolve(docs)
				})
			}
		})
	)

export const updateSubjectArray = data => {
	classroomCollection.find({ Name: data.Name }, (err, entry) => {
		if (err) {
			updateFailed()
			return err
		}
		if (entry.length > 0) {
			updateSinlgeClassroom(entry[0], data)
			classroomCollection.find({}, (error, docs) => {
				if (error) {
					updateFailed()
					return error
				}
				return docs
			})
		}
	})
}

export const updateClassSubjectArray = (classroomId, oldSubject, newSubject) => {
	classroomCollection.update(
		{ _id: classroomId },
		{ $push: { Subjects: newSubject } },
		{},
		err => {
			if (err) {
				updateFailed()
				return err
			}
		}
	)

	classroomCollection.update(
		{ _id: classroomId },
		{ $pull: { Subjects: oldSubject } },
		{},
		err => {
			if (err) {
				updateFailed()
				return err
			}
		}
	)
}
