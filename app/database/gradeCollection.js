import { saveSuccessful, saveFailed, unableToRetrieve } from '../notifications/general'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const gradeCollection = new Datastore({
	filename: path.join(userDataPath, 'grade.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const addGradeData = data => {
	gradeCollection.insert(data, (error, doc) => {
		if (error) {
			saveFailed()
			return error
		}
		saveSuccessful()
		return doc
	})
}

export const getAllGrades = () =>
	new Promise((resolve, reject) =>
		gradeCollection.find({}, (err, docs) => {
			if (err) {
				unableToRetrieve()
				return reject(err)
			}
			return resolve(docs)
		})
	)
