// @flow
import { saveSuccessful,
         saveError
        } from "../components/notifications/General";

const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const schoolDB = new Datastore({ filename: path.join(userDataPath, 'school.db'),
autoload: true, timestampData: true })

export const addSchoolData = (data) => {
  schoolDB.insert(data, (err, entry) => {
    if (err) {
      saveError()
      return err
    }
    saveSuccessful()
  });
};

export const getSchoolData = () => new Promise(((resolve, reject) => schoolDB.find({},  (err, entry) => {
      if (err) {
        return reject(err)
      }
      return resolve(entry);
  })));
