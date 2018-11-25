/* eslint-disable no-underscore-dangle */
// @flow
import {
	saveSuccessful,
	saveError,
	entryAlreadyExists,
	unableToRetrieve,
	deleteSubjectFailed,
	deleteSuccessful
} from '../components/notifications/General'
import { getClassroomData, updateSubjectArray } from './classroomCollection'

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
