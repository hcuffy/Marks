/* eslint-disable no-underscore-dangle */
import {
	unableToRetrieve,
	saveFailed,
	saveSuccessful,
	updateFailed,
	updateSuccessful
} from '../notifications/general'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')
const capabilityCollection = new Datastore({
	filename: path.join(collectionsPath, 'capability.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const getAllAnswers = () =>
	new Promise((resolve, reject) =>
		capabilityCollection.find({}, (err, docs) => {
			if (err) {
				unableToRetrieve()

				return reject(err)
			}

			return resolve(docs)
		})
	)

export const addNewAnswer = data => {
	capabilityCollection.insert(data, error => {
		if (error) {
			saveFailed()

			return error
		}
		saveSuccessful()
	})
}

const updateAnswer = data => {
	const { classroomId, questionSet } = data

	capabilityCollection.update({ classroomId }, { $set: { questionSet } }, {}, err => {
		if (err) {
			updateFailed()

			return err
		}
		updateSuccessful()
	})
}

export const updateAnswerData = data =>
	new Promise((resolve, reject) => {
		const { classroomId } = data

		capabilityCollection.find({ classroomId }, (err, entry) => {
			if (err) {
				return err
			}

			if (entry.length > 0) {
				updateAnswer(data)
			} else {
				addNewAnswer(data)
			}
			capabilityCollection.find({}, (error, docs) => {
				if (error) {
					return reject(error)
				}

				return resolve(docs)
			})
		})
	})

export const updateSingleCapability = data =>
	new Promise((resolve, reject) => {
		const { classroomId, questionId, studentId, optionTag } = data

		capabilityCollection.update(
			{ classroomId },
			{ $set: { students: { : { questionId: optionTag } } } },
			{},
			err => {
				if (err) {
					updateFailed()

					return err
				}

				capabilityCollection.find({}, (error, docs) => {
					if (error) {
						return reject(error)
					}

					return resolve(docs)
				})
			}
		)
	})
