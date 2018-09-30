const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')

const schoolDB = new Datastore({ filename: path.join(userDataPath, 'school.db') , autoload: true, timestampData: true })


exports.addSchoolData = (data) => {
  console.log('in here');
  schoolDB.insert(data, (err, document) => {
    if (err) {
    return err
  }
      console.log('Document inserted successfully');
  });
};
