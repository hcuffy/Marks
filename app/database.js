const Datastore = require('nedb')
const electron = require('electron')
const path = require('path')

const userDataPath = (electron.app || electron.remote.app).getPath('userData')

export var db = new Datastore({ filename: path.join(userDataPath, 'data.db') , autoload: true, timestampData: true })

// const user = {
// 	first: 'Digi',
// 	last: 'mon'
// }
//
// db.insert(user, (err, doc) => {
// 	console.log('Inserted', doc.first, 'with ID', doc._id)
// })
