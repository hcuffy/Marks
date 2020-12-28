/* eslint global-require: off, no-console: off */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import {app, BrowserWindow, shell} from 'electron';
import {autoUpdater} from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

export default class AppUpdater {
    constructor() {
        log.transports.file.level = 'info';
        if (process.env.NODE_ENV !== 'development') {
            autoUpdater.logger = log;
            autoUpdater.checkForUpdatesAndNotify();
        }
    }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    require('electron-debug')();
}

const installExtensions = async() => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = ['REACT_DEVELOPER_TOOLS'];

    return installer.default(extensions.map(name => installer[name]), forceDownload).catch(console.log);
};

const createWindow = async() => {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
        await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged ? path.join(process.resourcesPath, 'resources') : path.join(__dirname, '../resources');
    const getAssetPath = (...paths) => { return path.join(RESOURCES_PATH, ...paths); };

    mainWindow = new BrowserWindow({
        show:           false,
        width:          1024,
        height:         728,
        icon:           getAssetPath('icon.png'),
        webPreferences: {
            nodeIntegration:    true,
            enableRemoteModule: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.openDevTools();

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

    mainWindow.on('closed', () => { mainWindow = null; });

    const menuBuilder = new MenuBuilder(mainWindow);
    menuBuilder.buildMenu();

    mainWindow.webContents.on('new-window', (event, url) => {
        event.preventDefault();
        shell.openExternal(url);
    });

    // eslint-disable-next-line no-new
    new AppUpdater();
};

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
