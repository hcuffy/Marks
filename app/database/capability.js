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
const Capability = new Datastore({
	filename: path.join(collectionsPath, 'capability.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const getAllAnswers = () =>
	new Promise((resolve, reject) =>
		Capability.find({}, (err, docs) => {
			if (err) {
				unableToRetrieve()

				return reject(err)
			}

			return resolve(docs)
		})
	)

export const addNewAnswer = data => {
	Capability.insert(data, error => {
		if (error) {
			saveFailed()

			return error
		}
		saveSuccessful()
	})
}

const updateAnswer = data => {
	const { classroomId, questionSet } = data

	Capability.update({ classroomId }, { $set: { questionSet } }, {}, err => {
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

		Capability.find({ classroomId }, (err, entry) => {
			if (err) {
				return err
			}

			if (entry.length > 0) {
				updateAnswer(data)
			} else {
				addNewAnswer(data)
			}
			Capability.find({}, (error, docs) => {
				if (error) {
					return reject(error)
				}

				return resolve(docs)
			})
		})
	})
