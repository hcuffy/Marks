const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')

const schoolDB = new Datastore({ filename: path.join(userDataPath, 'school.db') , autoload: true, timestampData: true })

export const LoadState = schoolDB;

exports.addSchoolData = (data) => {
  schoolDB.insert(data, (err, entry) => {
    if (err) {

      return err
    }
  });
};
// TODO: Send DB data
exports.getSchoolData =  () => {
const schoolAddress = {}
  schoolDB.find({},  (err, entry) => {
        if (err) {
          return err
        }
      schoolAddress.info = entry;
      
        return schoolAddress;
      });


};
