import { shell } from 'electron'
import { SUPPORT_APP } from '../constants/externalLinks'

export const supportTheApp = () => {
	shell.openExternal(SUPPORT_APP)
}

export const openResource = event => {
	const link = event.target.getAttribute('data-name')
	shell.openExternal(link)
}
