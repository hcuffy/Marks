import {
	saveFailed,
	unableToRetrieve,
	updateFailed,
	deletionFailed,
	deletionSuccessful
} from '../notifications/general'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')

const gradeCollection = new Datastore({
	filename: path.join(collectionsPath, 'grade.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const updateGradeData = (data, id) => {
	const { grade, examId, studentId, date, weight } = data
	gradeCollection.update(
		{ _id: id },
		{ grade, examId, studentId, date, weight },
		{},
		err => {
			if (err) {
				updateFailed()
				return err
			}
		}
	)
}
export const addGradeData = data => {
	gradeCollection.insert(data, (error, doc) => {
		if (error) {
			saveFailed()
			return error
		}
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

export const deleteAllStudentGrade = data =>
	new Promise((resolve, reject) =>
		gradeCollection.remove({ _id: data }, { multi: true }, err => {
			if (err) {
				deletionFailed()
				return reject(err)
			}
			gradeCollection.find({}, (error, docs) => {
				if (err) {
					return reject(err)
				}
				deletionSuccessful()
				return resolve(docs)
			})
		})
	)
