/* eslint-disable max-len */
// @flow
import { app, Menu, shell, BrowserWindow } from 'electron'

let newPanelWindow = null
const openAttributionWindow = () => {
	if (newPanelWindow) {
		newPanelWindow.focus()
		return
	}

	newPanelWindow = new BrowserWindow({
		height: 500,
		width: 500,
		title: 'Attribution',
		resizable: false,
		minimizable: false,
		fullscreenable: false
	})

	newPanelWindow.on('closed', () => {
		newPanelWindow = null
	})

	newPanelWindow.loadURL(`file://${__dirname}/views/attribution.html`)
}
export default class MenuBuilder {
	mainWindow: BrowserWindow

	constructor(mainWindow: BrowserWindow) {
		this.mainWindow = mainWindow
	}

	buildMenu() {
		if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
			this.setupDevelopmentEnvironment()
		}

		const template =
			process.platform === 'darwin'
				? this.buildDarwinTemplate()
				: this.buildDefaultTemplate()

		const menu = Menu.buildFromTemplate(template)
		Menu.setApplicationMenu(menu)

		return menu
	}

	setupDevelopmentEnvironment() {
		this.mainWindow.openDevTools()
		this.mainWindow.webContents.on('context-menu', (e, props) => {
			const { x, y } = props

			Menu.buildFromTemplate([
				{
					label: 'Inspect element',
					click: () => {
						this.mainWindow.inspectElement(x, y)
					}
				}
			]).popup(this.mainWindow)
		})
	}

	buildDarwinTemplate() {
		const subMenuAbout = {
			label: 'Marks',
			submenu: [
				{
					label: 'About Marks',
					selector: 'orderFrontStandardAboutPanel:'
				},
				{ type: 'separator' },
				{
					label: 'Hide Marks',
					accelerator: 'Command+H',
					selector: 'hide:'
				},
				{
					label: 'Hide Others',
					accelerator: 'Command+Shift+H',
					selector: 'hideOtherApplications:'
				},
				{ type: 'separator' },
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: () => {
						app.quit()
					}
				}
			]
		}

		const subMenuViewDev = {
			label: 'View',
			submenu: [
				{
					label: 'Reload',
					accelerator: 'Command+R',
					click: () => {
						this.mainWindow.webContents.reload()
					}
				},
				{
					label: 'Toggle Full Screen',
					accelerator: 'Ctrl+Command+F',
					click: () => {
						this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
					}
				},
				{
					label: 'Toggle Developer Tools',
					accelerator: 'Alt+Command+I',
					click: () => {
						this.mainWindow.toggleDevTools()
					}
				}
			]
		}
		const subMenuViewProd = {
			label: 'View',
			submenu: [
				{
					label: 'Toggle Full Screen',
					accelerator: 'Ctrl+Command+F',
					click: () => {
						this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
					}
				}
			]
		}
		const subMenuWindow = {
			label: 'Window',
			submenu: [
				{
					label: 'Minimize',
					accelerator: 'Command+M',
					selector: 'performMiniaturize:'
				},
				{ label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
				{ type: 'separator' },
				{ label: 'Bring All to Front', selector: 'arrangeInFront:' }
			]
		}
		const subMenuHelp = {
			label: 'Help',
			submenu: [
				{
					label: 'Learn More',
					click() {
						shell.openExternal('https://github.com/hcuffy/My-Marks')
					}
				},
				{
					label: 'Documentation',
					click() {
						shell.openExternal('https://github.com/hcuffy/My-Marks/blob/master/README.md')
					}
				},
				{
					label: 'Search Issues',
					click() {
						shell.openExternal('https://github.com/hcuffy/My-Marks/issues')
					}
				},
				{
					label: 'Attribution',
					click() {
						openAttributionWindow()
					}
				}
			]
		}

		const subMenuView =
			process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd

		return [subMenuAbout,
			subMenuView,
			subMenuWindow,
			subMenuHelp]
	}

	buildDefaultTemplate() {
		const templateDefault = [
			{
				label: '&File',
				submenu: [
					{
						label: '&Open',
						accelerator: 'Ctrl+O'
					}, {
						label: '&Close',
						accelerator: 'Ctrl+W',
						click: () => {
							this.mainWindow.close()
						}
					}
				]
			},
			{
				label: '&View',
				submenu:
					process.env.NODE_ENV === 'development'
						? [
							{
								label: '&Reload',
								accelerator: 'Ctrl+R',
								click: () => {
									this.mainWindow.webContents.reload()
								}
							},
							{
								label: 'Toggle &Full Screen',
								accelerator: 'F11',
								click: () => {
									this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
								}
							},
							{
								label: 'Toggle &Developer Tools',
								accelerator: 'Alt+Ctrl+I',
								click: () => {
									this.mainWindow.toggleDevTools()
								}
							}
						  ]
						: [
							{
								label: 'Toggle &Full Screen',
								accelerator: 'F11',
								click: () => {
									this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
								}
							}
						  ]
			},
			{
				label: 'Help',
				submenu: [
					{
						label: 'Learn More',
						click() {
							shell.openExternal('https://github.com/hcuffy/My-Marks')
						}
					},
					{
						label: 'Documentation',
						click() {
							shell.openExternal(
								'https://github.com/hcuffy/My-Marks/blob/master/README.md'
							)
						}
					},
					{
						label: 'Search Issues',
						click() {
							shell.openExternal('https://github.com/hcuffy/My-Marks/issues')
						}
					},
					{
						label: 'Attribution',
						click() {
							openAttributionWindow()
						}
					}
				]
			}
		]

		return templateDefault
	}
}
