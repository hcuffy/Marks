/* eslint-disable max-len */
/* eslint global-require: off */

import {app, BrowserWindow} from 'electron';
import {autoUpdater} from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

export default class AppUpdater {
    constructor() {
        log.transports.file.level = 'info';
        autoUpdater.logger = log;
        autoUpdater.checkForUpdatesAndNotify();
    }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

if (
    process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
    require('electron-debug')();
}

const installExtensions = () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

    return Promise.all(
        extensions.map(name => installer.default(installer[name], forceDownload))
    ).catch(console.log);
};

const createWindow = () => {
    mainWindow = new BrowserWindow({
        show:           false,
        width:          1024,
        height:         728,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/app.html`);

    mainWindow.webContents.on('did-finish-load', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', async() => {
    if (
        process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
    ) {
        await installExtensions();
    }

    createWindow();
    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    // eslint-disable-next-line no-new
    new AppUpdater();
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
