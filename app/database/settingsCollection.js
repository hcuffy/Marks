import { saveSuccessful, saveFailed, unableToRetrieve } from '../notifications/general'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')
const settingsCollection = new Datastore({
	filename: path.join(collectionsPath, 'settings.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const saveGradeSystem = data => {
	settingsCollection.insert(data, error => {
		if (error) {
			return error
		}
	})
}

export const getAddressData = () =>
	new Promise((resolve, reject) =>
		settingsCollection.find({}, (err, entry) => {
			if (err) {
				unableToRetrieve()
				return reject(err)
			}
			return resolve(entry)
		})
	)

export const getSystemType = () =>
	new Promise((resolve, reject) =>
		settingsCollection.find({}, (err, docs) => {
			if (err) {
				return reject(err)
			}
			return resolve(docs)
		})
	)

const updateAddress = (previous, id) => {
	const { title, street, province, country, zip, year } = previous
	settingsCollection.update(
		{ _id: id },
		{ $set: { title, street, province, country, zip, year } },
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

const updateSystem = (previous, id) => {
	const { note, points, percent } = previous
	// eslint-disable-next-line max-len
	settingsCollection.update({ _id: id }, { $set: { note, points, percent } }, {}, err => {
		if (err) {
			saveFailed()
			return err
		}
		saveSuccessful()
	})
}

export const updateGradeType = async data => {
	const setting = await getSystemType()
	return new Promise(resolve => {
		updateSystem(data, setting[0]._id)

		return resolve(getSystemType())
	})
}

export const addAddress = async data => {
	const setting = await getAddressData()
	return new Promise(resolve => {
		updateAddress(data, setting[0]._id)
		return resolve(getAddressData())
	})
}
