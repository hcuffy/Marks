const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')

const schoolDB = new Datastore({ filename: path.join(userDataPath, 'school.db') , autoload: true, timestampData: true })


exports.addSchoolData = (data) => {
  schoolDB.insert(data, (err, document) => {
    if (err) {
      return err
    }
  });
};

exports.getSchoolData = () => {
  schoolDB.find({}, (err, entry) => {
      if (err) {
        return err
        console.log(entry);

      }
    });
};
