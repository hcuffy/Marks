/* eslint-disable max-len */
// @flow
import { app, Menu, shell, BrowserWindow } from 'electron'
import { translateMenu } from './utils/translationUtil'

let newPanelWindow = null
const openAttributionWindow = () => {
	if (newPanelWindow) {
		newPanelWindow.focus()
		return
	}

	newPanelWindow = new BrowserWindow({
		height: 500,
		width: 500,
		title: 'Credits',
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
		const locale = app.getLocale().slice(0, 2)
		const subMenuAbout = {
			label: 'Marks',
			submenu: [
				{
					label: translateMenu(locale, 'about'),
					selector: 'orderFrontStandardAboutPanel:'
				},
				{ type: 'separator' },
				{
					label: translateMenu(locale, 'hide'),
					accelerator: 'Command+H',
					selector: 'hide:'
				},
				{
					label: translateMenu(locale, 'others'),
					accelerator: 'Command+Shift+H',
					selector: 'hideOtherApplications:'
				},
				{ type: 'separator' },
				{
					label: translateMenu(locale, 'quit'),
					accelerator: 'Command+Q',
					click: () => {
						app.quit()
					}
				}
			]
		}

		const subMenuViewDev = {
			label: translateMenu(locale, 'view'),
			submenu: [
				{
					label: 'Reload',
					accelerator: 'Command+R',
					click: () => {
						this.mainWindow.webContents.reload()
					}
				},
				{
					label: translateMenu(locale, 'toggle'),
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
			label: translateMenu(locale, 'view'),
			submenu: [
				{
					label: translateMenu(locale, 'toggle'),
					accelerator: 'Ctrl+Command+F',
					click: () => {
						this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen())
					}
				}
			]
		}
		const subMenuWindow = {
			label: translateMenu(locale, 'window'),
			submenu: [
				{
					label: translateMenu(locale, 'mini'),
					accelerator: 'Command+M',
					selector: 'performMiniaturize:'
				},
				{ label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
				{ type: 'separator' },
				{ label: translateMenu(locale, 'front'), selector: 'arrangeInFront:' }
			]
		}
		const subMenuHelp = {
			label: translateMenu(locale, 'help'),
			submenu: [
				{
					label: translateMenu(locale, 'credits'),
					click() {
						openAttributionWindow()
					}
				},
				{
					label: translateMenu(locale, 'report'),
					click() {
						shell.openExternal(
							'https://github.com/hcuffy/My-Marks/blob/master/docs/Issues_and_requests.md'
						)
					}
				},
				{
					label: translateMenu(locale, 'propose'),
					click() {
						shell.openExternal(
							'https://github.com/hcuffy/My-Marks/blob/master/docs/Issues_and_requests.md'
						)
					}
				},
				{
					label: translateMenu(locale, 'buy'),
					click() {
						shell.openExternal('https://www.buymeacoffee.com/cuffy')
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
		const locale = app.getLocale().slice(0, 2)
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
				label: translateMenu(locale, 'hide'),
				submenu: [
					{
						label: translateMenu(locale, 'credits'),
						click() {
							openAttributionWindow()
						}
					},
					{
						label: translateMenu(locale, 'report'),
						click() {
							shell.openExternal(
								'https://github.com/hcuffy/My-Marks/blob/master/docs/Issues_and_requests.md'
							)
						}
					},
					{
						label: translateMenu(locale, 'propose'),
						click() {
							shell.openExternal(
								'https://github.com/hcuffy/My-Marks/blob/master/docs/Issues_and_requests.md'
							)
						}
					},
					{
						label: translateMenu(locale, 'buy'),
						click() {
							shell.openExternal('https://www.buymeacoffee.com/cuffy')
						}
					}
				]
			}
		]

		return templateDefault
	}
}
