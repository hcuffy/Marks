import { saveSuccessful, saveFailed, unableToRetrieve } from '../notifications/general'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')
const schoolCollection = new Datastore({
	filename: path.join(collectionsPath, 'school.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

const updateData = (previous, current) => {
	const { title, street, province, country, zip, year } = current
	schoolCollection.update(
		{ title: previous.title },
		{
			title,
			street,
			province,
			country,
			zip,
			year
		},
		{},
		err => {
			if (err) {
				saveFailed()
				return err
			}
			saveSuccessful()
		}
	)
}

export const addSchoolData = data => {
	schoolCollection.find({}, (err, entry) => {
		if (err) {
			saveFailed()
			return err
		}
		if (entry.length > 0) {
			updateData(entry[0], data)
			return
		}
		schoolCollection.insert(data, error => {
			if (error) {
				saveFailed()
				return error
			}
			saveSuccessful()
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
