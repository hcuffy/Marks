/* eslint-disable no-underscore-dangle */
// @flow
import {
	saveSuccessful,
	saveError,
	entryAlreadyExists
} from '../components/notifications/General'
import { getClassroomData } from './classroomCollection'

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
	if (!_.includes(selectedClass.Subjects, subjectData.Name)) {
		return selectedClass
	}
	return true
}

export const addSubjectData = async data => {
	const subjectState = await getSubjects(data)

	if (subjectState === true) {
		entryAlreadyExists()
		return -1
	}

	const newData = _.merge(data, { Tests: [], ClassroomId: subjectState._id })

	subjectCollection.insert(newData, (error, doc) => {
		if (error) {
			saveError()
			return error
		}
		saveSuccessful()
		return doc
	})
}
