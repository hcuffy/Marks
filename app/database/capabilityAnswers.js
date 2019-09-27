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

export const updateSingleAnswer = data =>
	new Promise((resolve, reject) => {
		const { classroomId, questionId, studentId, optionTag } = data

		CapabilityAnswers.update(
			{ classroomId },
			{ $set: { students: { hold: { questionId: optionTag } } } },
			{},
			err => {
				if (err) {
					updateFailed()

					return err
				}

				CapabilityAnswers.find({}, (error, docs) => {
					if (error) {
						return reject(error)
					}

					return resolve(docs)
				})
			}
		)
	})
