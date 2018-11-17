// @flow
import {
	saveSuccessful,
	saveError,
	entryAlreadyExists
} from '../components/notifications/General'
import { getClassroomData } from './classroomCollection'

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

async function getSubjects() {
	const data = await getClassroomData()
	console.log(data)
}

export const addSubjectData = data => {
	subjectCollection.find({ Name: data.Name }, (err, entry) => {
		if (err) {
			saveError()
			return err
		}
		if (entry.length > 0) {
			entryAlreadyExists()
			return
		}
		const newData = data
		newData.Tests = []
		getSubjects()
		// subjectCollection.insert(newData, (error, doc) => {
		// 	if (error) {
		// 		saveError()
		// 		return error
		// 	}
		// 	saveSuccessful()
		// 	return doc
		// })
	})
}
