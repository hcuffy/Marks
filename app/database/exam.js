import {
	saveSuccessful,
	saveFailed,
	entryAlreadyExists,
	unableToRetrieve,
	updateFailed,
	updateSuccessful
} from '../notifications/general'
import { addExamToSubjectArray, updateSubjectTestArray } from './subject'
import { deleteGradesByExamId } from './grade'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')

const Exam = new Datastore({
	filename: path.join(collectionsPath, 'examinations.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const addExamData = data => {
	Exam.find({ name: data.title }, (err, entry) => {
		if (err) {
			saveFailed()

			return err
		}
		if (entry.length > 0) {
			entryAlreadyExists()

			return
		}
		const newData = data

		Exam.insert(newData, (error, doc) => {
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

export const getAllExams = () =>
	new Promise((resolve, reject) =>
		Exam.find({}, (err, entry) => {
			if (err) {
				unableToRetrieve()

				return reject(err)
			}

			return resolve(entry)
		})
	)

const updateTestsArr = (examId, subjectId) => {
	Exam.find({ _id: examId }, (err, entry) => {
		if (err) {
			return err
		}
		const examTitle = entry[0].title
		updateSubjectTestArray(subjectId, examTitle)
	})
}

export const deleteExam = ({ examId, subjectId }) =>
	new Promise((resolve, reject) => {
		updateTestsArr(examId, subjectId)
		Exam.remove({ _id: examId }, err => {
			if (err) {
				return reject(err)
			}

			Exam.find({}, (error, exams) => {
				if (err) {
					return reject(err)
				}
				deleteGradesByExamId(examId)

				return resolve(exams)
			})
		})
	})

const updateSingleExam = (previous, current) => {
	const { title, date, weight } = current
	const { subjectId } = previous

	Exam.update(
		{ _id: previous._id },
		{
			title,
			date,
			weight,
			subjectId
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
		const { examId, subjectId, title } = data
		Exam.find({ _id: examId }, (err, entry) => {
			if (err) {
				return err
			}
			if (entry.length > 0) {
				updateSingleExam(entry[0], data)
				updateSubjectTestArray(subjectId, entry[0].title)
				addExamToSubjectArray({ subjectId, title })
				Exam.find({}, (error, docs) => {
					if (error) {
						return reject(error)
					}

					return resolve(docs)
				})
			}
		})
	})
