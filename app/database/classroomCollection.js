// @flow
import {
  saveSuccessful,
  saveError,
  unableToRetrieve,
  entryAlreadyExists
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
  classroomCollection.find({ Name: data.Name }, (err, entry) => {
    if (err) {
      saveError()
      return err
    }
    if (entry.length > 0) {
      entryAlreadyExists()
      return
    }
    data.Subjects = []
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
