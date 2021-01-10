/* eslint-disable max-lines*/
import {app, Menu, shell} from 'electron';
import {customMenuTranslation} from './utils';

export default class MenuBuilder {
    constructor(mainWindow) {
        this.mainWindow = mainWindow;
    }

    buildMenu() {
        if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
            this.setupDevelopmentEnvironment();
        }

        const template = process.platform === 'darwin' ? this.buildDarwinTemplate() : this.buildDefaultTemplate();

        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);

        return menu;
    }

    setupDevelopmentEnvironment() {
        this.mainWindow.openDevTools();
        this.mainWindow.webContents.on('context-menu', (_, props) => {
            const {x, y} = props;

            Menu.buildFromTemplate([
                {
                    label: 'Inspect element',
                    click: () => {
                        this.mainWindow.webContents.inspectElement(x, y);
                    }
                }
            ]).popup({window: this.mainWindow});
        });
    }

    buildDarwinTemplate() {
        const subMenuAbout = {
            label:   'Marks',
            submenu: [
                {
                    label:    customMenuTranslation('about'),
                    selector: 'orderFrontStandardAboutPanel:'
                },
                {type: 'separator'},
                {
                    label:       customMenuTranslation('hide'),
                    accelerator: 'Command+H',
                    selector:    'hide:'
                },
                {
                    label:       customMenuTranslation('others'),
                    accelerator: 'Command+Shift+H',
                    selector:    'hideOtherApplications:'
                },
                {type: 'separator'},
                {
                    label:       customMenuTranslation('quit'),
                    accelerator: 'Command+Q',
                    click:       () => {
                        app.quit();
                    }
                }
            ]
        };

        const subMenuViewDev = {
            label:   customMenuTranslation('view'),
            submenu: [
                {
                    label:       'Reload',
                    accelerator: 'Command+R',
                    click:       () => {
                        this.mainWindow.webContents.reload();
                    }
                },
                {
                    label:       customMenuTranslation('toggle'),
                    accelerator: 'Ctrl+Command+F',
                    click:       () => {
                        if (!this.mainWindow.isDestroyed()) {
                            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                        }
                    }
                },
                {
                    label:       'Toggle Developer Tools',
                    accelerator: 'Alt+Command+I',
                    click:       () => {
                        this.mainWindow.toggleDevTools();
                    }
                }
            ]
        };
        const subMenuViewProd = {
            label:   customMenuTranslation('view'),
            submenu: [
                {
                    label:       customMenuTranslation('toggle'),
                    accelerator: 'Ctrl+Command+F',
                    click:       () => {
                        if (!this.mainWindow.isDestroyed()) {
                            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
                        }
                    }
                }
            ]
        };
        const subMenuWindow = {
            label:   customMenuTranslation('window'),
            submenu: [
                {
                    label:       customMenuTranslation('mini'),
                    accelerator: 'Command+M',
                    selector:    'performMiniaturize:'
                },
                {
                    label:       customMenuTranslation('close'),
                    accelerator: 'Command+W',
                    selector:    'performClose:'
                }
            ]
        };

        const subMenuView = process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

        return [subMenuAbout, subMenuView, subMenuWindow];
    }

    buildDefaultTemplate() {
        const templateDefault = [
            {
                label:   '&File',
                submenu: [
                    {
                        label:       '&Open',
                        accelerator: 'Ctrl+O'
                    },
                    {
                        label:       '&Close',
                        accelerator: 'Ctrl+W',
                        click:       () => {
                            this.mainWindow.close();
                        }
                    }
                ]
            },
            {
                label:   '&View',
                submenu:
          process.env.NODE_ENV === 'development' ||
          process.env.DEBUG_PROD === 'true'
              ? [
                  {
                      label:       '&Reload',
                      accelerator: 'Ctrl+R',
                      click:       () => {
                          this.mainWindow.webContents.reload();
                      }
                  },
                  {
                      label:       'Toggle &Full Screen',
                      accelerator: 'F11',
                      click:       () => {
                          this.mainWindow.setFullScreen(
                              !this.mainWindow.isFullScreen()
                          );
                      }
                  },
                  {
                      label:       'Toggle &Developer Tools',
                      accelerator: 'Alt+Ctrl+I',
                      click:       () => {
                          this.mainWindow.webContents.toggleDevTools();
                      }
                  }
              ]
              : [
                  {
                      label:       'Toggle &Full Screen',
                      accelerator: 'F11',
                      click:       () => {
                          this.mainWindow.setFullScreen(
                              !this.mainWindow.isFullScreen()
                          );
                      }
                  }
              ]
            },
            {
                label:   'Help',
                submenu: [
                    {
                        label: 'Learn More',
                        click() {
                            shell.openExternal('https://electronjs.org');
                        }
                    },
                    {
                        label: 'Documentation',
                        click() {
                            shell.openExternal(
                                'https://github.com/electron/electron/tree/master/docs#readme'
                            );
                        }
                    },
                    {
                        label: 'Community Discussions',
                        click() {
                            shell.openExternal('https://www.electronjs.org/community');
                        }
                    },
                    {
                        label: 'Search Issues',
                        click() {
                            shell.openExternal('https://github.com/electron/electron/issues');
                        }
                    }
                ]
            }
        ];

        return templateDefault;
    }
}
