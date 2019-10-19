import { unableToRetrieve, saveFailed, saveSuccessful, updateFailed, updateSuccessful } from '../notifications/general'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')
const Capability = new Datastore({
	filename: path.join(collectionsPath, 'question.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const getAllQuestions = () =>
	new Promise((resolve, reject) =>
		Capability.find({}, (err, docs) => {
			if (err) {
				unableToRetrieve()

				return reject(err)
			}

			return resolve(docs)
		})
	)

const addNewQuestion = data => {
	Capability.insert(data, error => {
		if (error) {
			saveFailed()

			return error
		}
		saveSuccessful()
	})
}

const updateQuestion = data => {
	const { classroomId, questionSet } = data

	Capability.update({ classroomId }, { $set: { questionSet } }, {}, err => {
		if (err) {
			updateFailed()

			return err
		}
		updateSuccessful()
	})
}

export const updateQuestionData = data =>
	new Promise((resolve, reject) => {
		const { classroomId } = data

		Capability.find({ classroomId }, (err, entry) => {
			if (err) {
				return err
			}

			if (entry.length > 0) {
				updateQuestion(data)
			} else {
				addNewQuestion(data)
			}
			Capability.find({}, (error, docs) => {
				if (error) {
					return reject(error)
				}

				return resolve(docs)
			})
		})
	})
