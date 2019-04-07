import { toast } from 'react-toastify'
import { customTranslate } from '../utils/translationUtil'

export const saveSuccessful = () => {
	toast.success(customTranslate('notifications.general.saveSuccess'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const saveFailed = () => {
	toast.error(customTranslate('notifications.general.saveFail'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const unableToRetrieve = () => {
	toast.success(customTranslate('notifications.general.retrieveFail'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const entryAlreadyExists = () => {
	toast.error(customTranslate('notifications.general.exists'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const deletionSuccessful = () => {
	toast.success(customTranslate('notifications.general.deleteSuccess'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const deletionFailed = () => {
	toast.error(customTranslate('notifications.general.deleteFail'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const updateSuccessful = () => {
	toast.success(customTranslate('notifications.general.updateSuccess'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const updateFailed = () => {
	toast.error(customTranslate('notifications.general.updateFail'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const noUpdate = () => {
	toast.success(customTranslate('notifications.general.noUpdate'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}
