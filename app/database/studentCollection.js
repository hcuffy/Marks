/* eslint-disable no-underscore-dangle */
import {
	saveSuccessful,
	saveFailed,
	unableToRetrieve,
	deletionFailed,
	updateFailed,
	updateSuccessful
} from '../notifications/general'
import { deleteGradesByStudentId } from './gradeCollection'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const collectionsPath = path.join(userDataPath, 'collections')
const studentCollection = new Datastore({
	filename: path.join(collectionsPath, 'student.db'),
	autoload: true,
	corruptAlertThreshold: 1,
	timestampData: true
})

export const addNewStudentData = data => {
	studentCollection.insert(data, error => {
		if (error) {
			saveFailed()

			return error
		}
		saveSuccessful()
	})
}

export const getAllStudents = () =>
	new Promise((resolve, reject) =>
		studentCollection.find({}, (err, docs) => {
			if (err) {
				unableToRetrieve()

				return reject(err)
			}

			return resolve(docs)
		})
	)

export const deleteStudent = data =>
	new Promise((resolve, reject) =>
		studentCollection.remove({ _id: data }, err => {
			if (err) {
				deletionFailed()

				return reject(err)
			}
			studentCollection.find({}, (error, students) => {
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

	studentCollection.update(
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
		studentCollection.find({}, (error, docs) => {
			if (error) {
				updateFailed()

				return reject(error)
			}

			return resolve(docs)
		})
	})
