// @flow
import {
  saveSuccessful,
  saveError,
  unableToRetrieve
} from '../components/notifications/general'

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const classroomCollection = new Datastore({
  filename: path.join(userDataPath, 'classroom.db'),
  autoload: true,
  timestampData: true
})

function updateData(previous, current) {
  const { title, street, schoolstate, country, zip, year } = current
  classroomCollection.update(
    { title: previous.title },
    {
      title,
      street,
      schoolstate,
      country,
      zip,
      year
    },
    {},
    (err, entry) => {
      if (err) {
        saveError()
        return err
      }
      saveSuccessful()
    }
  )
}

export const addClassroomData = data => {
  classroomCollection.find({}, (err, entry) => {
    if (err) {
      saveError()
      return err
    }
    if (entry.length > 0) {
      updateData(entry[0], data)
      return 'saved'
    }
    classroomCollection.insert(data, (err, entry) => {
      if (err) {
        saveError()
        return err
      }
      saveSuccessful()
      return 'Saved'
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
