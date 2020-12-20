/* eslint no-sync: 0 */
import * as NeDB from 'nedb';
import * as thenify from 'thenify';
import _ from 'lodash';

const electron = require('electron');
const path = require('path');
const fs = require('fs');

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const collectionsPath = path.join(userDataPath, 'collections');

(function createCollectionPath() {
    if (!fs.existsSync(collectionsPath)) {
        fs.mkdirSync(collectionsPath);
    }
}());

const createDatastore = datastore => {
    const nedbDatastore = {nedb: datastore};
    const usedMethods = ['count', 'find', 'findOne', 'insert', 'remove', 'update'];

    _.forEach(usedMethods, method => {
        nedbDatastore[method] = thenify(datastore[method].bind(datastore));
    });

    return nedbDatastore;
};

const Datastore = options => {
    return createDatastore(new NeDB(options));
};

export default function connectionToDB(collection) {
    const options = {
        filename:              path.join(collectionsPath, `${collection}.db`),
        autoload:              true,
        corruptAlertThreshold: 1,
        timestampData:         true
    };

    return Datastore(options);
}
