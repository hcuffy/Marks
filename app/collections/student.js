import {
	saveSuccessful,
	saveFailed,
	unableToRetrieve,
	deletionFailed,
	updateFailed,
	updateSuccessful
} from '../notifications/general'
import { deleteGradesByStudentId } from './grade'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')
const Student = new Datastore({
	filename: path.join(collectionsPath, 'student.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const addNewStudentData = data => {
	Student.insert(data, error => {
		if (error) {
			saveFailed()

			return error
		}
		saveSuccessful()
	})
}

export const getAllStudents = () =>
	new Promise((resolve, reject) =>
		Student.find({}, (err, docs) => {
			if (err) {
				unableToRetrieve()

				return reject(err)
			}

			return resolve(docs)
		})
	)

export const deleteStudent = data =>
	new Promise((resolve, reject) =>
		Student.remove({ _id: data }, err => {
			if (err) {
				deletionFailed()

				return reject(err)
			}
			Student.find({}, (error, students) => {
				if (err) {
					return reject(err)
				}
				deleteGradesByStudentId(data)

				return resolve(students)
			})
		})
	)

const updateSingleStudent = previous => {
	const { firstname, lastname, gender, classroom, id } = previous

	Student.update(
		{ _id: id },
		{
			firstname,
			lastname,
			gender,
			classroom
		},
		{},
		err => {
			if (err) {
				updateFailed()

				return err
			}
			updateSuccessful()
		}
	)
}

export const updateStudentData = data =>
	new Promise((resolve, reject) => {
		updateSingleStudent(data)
		Student.find({}, (error, docs) => {
			if (error) {
				updateFailed()

				return reject(error)
			}

			return resolve(docs)
		})
	})
