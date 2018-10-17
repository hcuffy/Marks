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
const schoolDB = new Datastore({
  filename: path.join(userDataPath, 'school.db'),
  autoload: true,
  timestampData: true
})

function updateData(previous, current) {
  const { title, street, state, country, zip, year } = current
  schoolDB.update(
    { title: previous.title },
    {
      title,
      street,
      state,
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

export const addSchoolData = data => {
  schoolDB.find({}, (err, entry) => {
    if (err) {
      saveError()
      return err
    }
    if (entry.length > 0) {
      console.log('here one')
      updateData(entry[0], data)
      return 'saved'
    }
    schoolDB.insert(data, (err, entry) => {
      if (err) {
        saveError()
        return err
      }
      saveSuccessful()
      return 'Saved'
    })
  })
}

export const getSchoolData = () =>
  new Promise((resolve, reject) =>
    schoolDB.find({}, (err, entry) => {
      if (err) {
        unableToRetrieve()
        return reject(err)
      }
      return resolve(entry)
    })
  )
