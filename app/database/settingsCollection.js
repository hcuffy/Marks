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

const updateSystem = (previous, id) => {
	const { note, points, percent } = previous
	settingsCollection.update({ _id: id }, { note, points, percent }, {}, err => {
		if (err) {
			return err
		}
	})
}

export const updateGradeType = async data => {
	const setting = await getSystemType()
	return new Promise(resolve => {
		updateSystem(data, setting[0]._id)

		return resolve(getSystemType())
	})
}
