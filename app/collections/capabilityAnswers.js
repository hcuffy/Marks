import {
	unableToRetrieve,
	saveFailed,
	saveSuccessful,
	updateFailed,
	updateSuccessful
} from '../notifications/general'

const _ = require('lodash')
const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')
const Answers = new Datastore({
	filename: path.join(collectionsPath, 'answer.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const getAllAnswers = () =>
	new Promise((resolve, reject) => {
		Answers.find({}, (err, docs) => {
			if (err) {
				unableToRetrieve()
			}

			return resolve(docs)
		})
	})

export const addStudentAnswer = answerData => {
	const { classroomId, questionId, studentId, optionTag } = answerData
	const capability = [{ questionId, optionTag }]
	const adjustedData = { classroomId, studentId, capability }

	Answers.insert(adjustedData, error => {
		if (error) {
			saveFailed()
		}
		saveSuccessful()
	})
}

const updateStudentAnswer = ({
	classroomId,
	studentId,
	questionId,
	optionTag
}) => {
	const answerToUpdate = { classroomId, studentId }
	Answers.find(answerToUpdate, (err, answer) => {
		if (err) {
			updateFailed()
		}
		const answerExists = _.find(answer[0].capability, { questionId })

		if (_.size(answerExists) > 0) {
			Answers.update(
				answerToUpdate,
				{ $pull: { capability: { questionId } } },
				{},
				() => {}
			)
		}

		Answers.update(
			answerToUpdate,
			{ $addToSet: { capability: { questionId, optionTag } } },
			{},
			() => {}
		)
		updateSuccessful()
	})
}

export const updateSingleAnswer = answerData =>
	new Promise((resolve, reject) => {
		const { classroomId, studentId } = answerData
		Answers.count({ classroomId, studentId }, (error, count) => {
			if (error) {
				updateFailed()
			}
			if (count < 1) {
				addStudentAnswer(answerData)
			} else {
				updateStudentAnswer(answerData)
			}
		})

		Answers.find({}, (error, docs) => {
			if (error) {
				updateFailed()
			}

			return resolve(docs)
		})
	})
