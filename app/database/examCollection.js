import {
	saveSuccessful,
	saveFailed,
	entryAlreadyExists,
	unableToRetrieve,
	deletionSuccessful,
	updateFailed,
	updateSuccessful
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
			saveFailed()
			return err
		}
		if (entry.length > 0) {
			entryAlreadyExists()
			return
		}
		const newData = data

		examCollection.insert(newData, (error, doc) => {
			if (error) {
				saveFailed()
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
	examCollection.find({ _id: examId }, (err, entry) => {
		if (err) {
			return err
		}
		const examTitle = entry[0].Title
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
				deletionSuccessful()
				return resolve(docs)
			})
		})
	})

function updateSinlgeExam(previous, current) {
	const { Title, Date, Weight } = current
	const { SubjectId } = previous

	examCollection.update(
		{ _id: previous._id },
		{
			Title,
			Date,
			Weight,
			SubjectId
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

export const updateExamData = data =>
	new Promise((resolve, reject) => {
		const { ExamId, SubjectId, Title } = data
		examCollection.find({ _id: ExamId }, (err, entry) => {
			if (err) {
				return err
			}
			if (entry.length > 0) {
				updateSinlgeExam(entry[0], data)

				updateSubjecTestsArray(SubjectId, entry[0].Title)
				addExamToSubjectArray({ SubjectId, Title })
				examCollection.find({}, (error, docs) => {
					if (error) {
						return reject(error)
					}
					return resolve(docs)
				})
			}
		})
	})
