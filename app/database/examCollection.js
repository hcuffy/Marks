import {
	saveSuccessful,
	saveError,
	entryAlreadyExists,
	unableToRetrieve,
	deleteSuccessful
} from '../notifications/general'
import { addExamToSubjectArray, updateSubjecTestsArray } from './subjectCollection'

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

export const getExamData = () =>
	new Promise((resolve, reject) =>
		examCollection.find({}, (err, entry) => {
			if (err) {
				unableToRetrieve()
				return reject(err)
			}
			return resolve(entry)
		})
	)

function updateTestsArr(examId, subjectId) {
	console.log(examId, subjectId)
	examCollection.find({ _id: examId }, (err, entry) => {
		if (err) {
			return err
		}
		const examTitle = entry[0].Title
		console.log(examTitle)
		updateSubjecTestsArray(subjectId, examTitle)
	})
}
export const deleteExam = data =>
	new Promise((resolve, reject) => {
		updateTestsArr(data.examId, data.subjectId)
		examCollection.remove({ _id: data.examId }, err => {
			if (err) {
				return reject(err)
			}

			examCollection.find({}, (error, docs) => {
				if (err) {
					return reject(err)
				}
				deleteSuccessful()
				return resolve(docs)
			})
		})
	})
