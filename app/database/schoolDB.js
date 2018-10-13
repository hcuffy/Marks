const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')
const schoolDB = new Datastore({ filename: path.join(userDataPath, 'school.db') , autoload: true, timestampData: true })

exports.addSchoolData = (data) => {
  schoolDB.insert(data, (err, entry) => {
    if (err) {
      return err
    }
  });
};

export function getSchoolData() {
return new Promise(((resolve, reject) => schoolDB.find({},  (err, entry) => {
        if (err) {
          return reject(err)
        }
        return resolve(entry);
      })));
};
