/* eslint-disable no-underscore-dangle */
import { saveSuccessful, saveFailed } from '../notifications/general'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const studentCollection = new Datastore({
	filename: path.join(userDataPath, 'student.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const addNewStudentData = data => {
	studentCollection.insert(data, error => {
		if (error) {
			saveFailed()
			return error
		}
		saveSuccessful()
	})
}
