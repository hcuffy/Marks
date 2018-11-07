// @flow
import {
	saveSuccessful,
	saveError,
	unableToRetrieve,
	entryAlreadyExists
} from '../components/notifications/General'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const classroomCollection = new Datastore({
	filename: path.join(userDataPath, 'classroom.db'),
	autoload: true,
	timestampData: true
})

export const addClassroomData = data => {
	classroomCollection.find({ Name: data.Name }, (err, entry) => {
		if (err) {
			saveError()
			return err
		}
		if (entry.length > 0) {
			entryAlreadyExists()
			return
		}
		const newData = data
		newData.Subjects = []
		classroomCollection.insert(newData, (error, doc) => {
			if (error) {
				saveError()
				return error
			}
			saveSuccessful()
			return doc
		})
	})
}

export const getClassroomData = () =>
	new Promise((resolve, reject) =>
		classroomCollection.find({}, (err, entry) => {
			if (err) {
				unableToRetrieve()
				return reject(err)
			}
			return resolve(entry)
		})
	)

export const getRemoveClassroom = data =>
	new Promise((resolve, reject) =>
		classroomCollection.remove({ _id: data.id }, err => {
			if (err) {
				return reject(err)
			}
			classroomCollection.find({}, (error, docs) => {
				if (err) {
					return reject(err)
				}
				return resolve(docs)
			})
		})
	)

function updateRoomData(previous, current) {
	const { Name, Teacher, Code, Subject_Teacher } = current
	classroomCollection.update(
		{ Name: previous.Name },
		{
			Name,
			Teacher,
			Code,
			Subject_Teacher
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

export const updataRoom = data => {
	classroomCollection.find({ Name: data.Name }, (err, entry) => {
		if (err) {
			return err
		}
		if (entry.length > 0) {
			updateRoomData(entry[0], data)
			return 'saved'
		}
		classroomCollection.insert(data, error => {
			if (error) {
				saveError()
				return error
			}
			saveSuccessful()
			return 'Saved'
		})
	})
}
