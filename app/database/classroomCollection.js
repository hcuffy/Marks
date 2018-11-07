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
	corruptAlertThreshold: 1,
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

function updateSinlgeDoc(previous, current) {
	const { Name, Teacher, Code, Subject_Teacher } = current
	const { Subjects } = previous
	console.log(Subjects)
	classroomCollection.update(
		{ Name: previous.Name },
		{
			Name,
			Teacher,
			Code,
			Subject_Teacher,
			Subjects
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

export const updateRoomData = data =>
	new Promise((resolve, reject) =>
		classroomCollection.find({ Name: data.OldName }, (err, entry) => {
			if (err) {
				return err
			}
			if (entry.length > 0) {
				console.log(entry)
				updateSinlgeDoc(entry[0], data)
				classroomCollection.find({}, (error, docs) => {
					if (error) {
						return reject(error)
					}
					return resolve(docs)
				})
			}
		})
	)
