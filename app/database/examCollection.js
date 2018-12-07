import { saveSuccessful, saveError, entryAlreadyExists } from '../notifications/general'
import { addExamToSubjectArray } from './subjectCollection'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const examCollection = new Datastore({
	filename: path.join(userDataPath, 'examinations.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const addExamData = data => {
	examCollection.find({ Name: data.Title }, (err, entry) => {
		if (err) {
			saveError()
			return err
		}
		if (entry.length > 0) {
			entryAlreadyExists()
			return
		}
		const newData = data

		examCollection.insert(newData, (error, doc) => {
			if (error) {
				saveError()
				return error
			}
			saveSuccessful()
			addExamToSubjectArray(newData)
			return doc
		})
	})
}
