/* eslint-disable no-underscore-dangle */
// @flow
import {
	saveSuccessful,
	saveError,
	entryAlreadyExists
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
	if (!_.includes(selectedClass.Subjects, subjectData.Abbrivation)) {
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
	newRoom.Subjects.push(data.Abbrivation)

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
