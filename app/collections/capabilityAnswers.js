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
const CapabilityAnswers = new Datastore({
	filename: path.join(collectionsPath, 'answer.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const getAllAnswers = () =>
	new Promise((resolve, reject) => {
		CapabilityAnswers.find({}, (err, docs) => {
			if (err) {
				unableToRetrieve()

				return reject(err)
			}

			return resolve(docs)
		})
	})

export const addStudentAnswer = answerData => {
	const { classroomId, questionId, studentId, optionTag } = answerData
	const capability = [{ questionId, optionTag }]
	const adjustedData = { classroomId, studentId, capability }

	CapabilityAnswers.insert(adjustedData, error => {
		if (error) {
			saveFailed()

			return error
		}
		saveSuccessful()
	})
}

const updateStudentAnswer = ({ classroomId, studentId, questionId, optionTag }) => {
	new Promise((resolve, reject) => {
		CapabilityAnswers.find({ classroomId, studentId }, (err, answer) => {
			if (err) {
				unableToRetrieve()

				return reject(err)
			}
			const answerExists = _.find(answer[0].capability, { questionId })

			if (_.size(answerExists) > 0) {
				console.log('pulling')
				CapabilityAnswers.update(
					{ classroomId, studentId },
					{ $pull: { capability: { questionId } } },
					{},
					() => {}
				)
			}

			CapabilityAnswers.update(
				{ classroomId, studentId },
				{ $addToSet: { capability: { questionId, optionTag } } },
				{},
				() => {}
			)

			return resolve(answer)
		})
	})
}

export const updateSingleAnswer = answerData =>
	new Promise((resolve, reject) => {
		const { classroomId, studentId } = answerData
		CapabilityAnswers.count({ classroomId, studentId }, (error, count) => {
			if (error) {
				return reject(error)
			}
			if (count < 1) {
				addStudentAnswer(answerData)
				updateSuccessful()
			} else {
				updateStudentAnswer(answerData)
				updateSuccessful()
			}
		})

		CapabilityAnswers.find({}, (error, docs) => {
			if (error) {
				return reject(error)
			}

			return resolve(docs)
		})
	})
