/* eslint-disable no-underscore-dangle */
import {
	saveSuccessful,
	saveFailed,
	unableToRetrieve,
	deletionFailed
} from '../notifications/general'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')
const notesCollection = new Datastore({
	filename: path.join(collectionsPath, 'notes.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const addNewNote = data => {
	notesCollection.insert(data, error => {
		if (error) {
			saveFailed()

			return error
		}
		saveSuccessful()
	})
}

export const getAllNotes = () =>
	new Promise((resolve, reject) =>
		notesCollection.find({}, (err, docs) => {
			if (err) {
				unableToRetrieve()

				return reject(err)
			}

			return resolve(docs)
		})
	)

export const deleteNote = data =>
	new Promise((resolve, reject) =>
		notesCollection.remove({ _id: data }, err => {
			if (err) {
				deletionFailed()

				return reject(err)
			}
			notesCollection.find({}, (error, notes) => {
				if (err) {
					return reject(err)
				}

				return resolve(notes)
			})
		})
	)
