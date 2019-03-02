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

export const getSystemType = () =>
	new Promise((resolve, reject) =>
		settingsCollection.find({}, (err, docs) => {
			if (err) {
				return reject(err)
			}
			return resolve(docs)
		})
	)
