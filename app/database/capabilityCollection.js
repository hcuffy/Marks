/* eslint-disable no-underscore-dangle */
import { unableToRetrieve } from '../notifications/general'

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
