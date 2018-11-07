// @flow
import {
	saveSuccessful,
	saveError,
	unableToRetrieve
} from '../components/notifications/General'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const schoolCollection = new Datastore({
	filename: path.join(userDataPath, 'school.db'),
	autoload: true,
	timestampData: true
})

function updateData(previous, current) {
	const { Title, Street, Province, Country, Zip, Year } = current
	schoolCollection.update(
		{ Title: previous.Title },
		{
			Title,
			Street,
			Province,
			Country,
			Zip,
			Year
		},
		{},
		err => {
			if (err) {
				saveError()
				return err
			}
			saveSuccessful()
		}
	)
}

export const addSchoolData = data => {
	schoolCollection.find({}, (err, entry) => {
		if (err) {
			saveError()
			return err
		}
		if (entry.length > 0) {
			updateData(entry[0], data)
			return 'saved'
		}
		schoolCollection.insert(data, error => {
			if (error) {
				saveError()
				return error
			}
			saveSuccessful()
			return 'Saved'
		})
	})
}

export const getSchoolData = () =>
	new Promise((resolve, reject) =>
		schoolCollection.find({}, (err, entry) => {
			if (err) {
				unableToRetrieve()
				return reject(err)
			}
			return resolve(entry)
		})
	)
