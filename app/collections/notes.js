import {
	saveSuccessful,
	saveFailed,
	unableToRetrieve,
	deletionFailed,
	updateSuccessful,
	updateFailed
} from '../notifications/general'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')
const Notes = new Datastore({
	filename: path.join(collectionsPath, 'notes.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const addNewNote = data => {
	Notes.insert(data, error => {
		if (error) {
			saveFailed()
		}
		saveSuccessful()
	})
}

export const getAllNotes = () =>
	new Promise((resolve, reject) =>
		Notes.find({}, (err, docs) => {
			if (err) {
				unableToRetrieve()
			}

			return resolve(docs)
		})
	)

export const deleteNote = data =>
	new Promise((resolve, reject) =>
		Notes.remove({ _id: data }, err => {
			if (err) {
				deletionFailed()
			}
			Notes.find({}, (error, notes) => {
				if (err) {
				}

				return resolve(notes)
			})
		})
	)

const updateSingleNote = previousData => {
	const { title, note, noteId } = previousData

	Notes.update({ _id: noteId }, { $set: { title, note, noteId } }, {}, err => {
		if (err) {
			updateFailed()
		}
		updateSuccessful()
	})
}

export const updateNoteData = data =>
	new Promise((resolve, reject) => {
		updateSingleNote(data)
		Notes.find({}, (error, docs) => {
			if (error) {
				updateFailed()
			}

			return resolve(docs)
		})
	})
