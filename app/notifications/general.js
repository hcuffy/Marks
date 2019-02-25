import { toast } from 'react-toastify'
import { t } from '../utils/translationUtil'

export const saveSuccessful = () => {
	toast.success(t('notifications.general.saveSuccess'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const saveFailed = () => {
	toast.error(t('notifications.general.saveFail'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const unableToRetrieve = () => {
	toast.success(t('notifications.general.retrieveFail'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const entryAlreadyExists = () => {
	toast.error(t('notifications.general.exists'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const deletionSuccessful = () => {
	toast.success(t('notifications.general.deleteSuccess'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const deletionFailed = () => {
	toast.error(t('notifications.general.deleteFail'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const updateSuccessful = () => {
	toast.success(t('notifications.general.updateSuccess'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const updateFailed = () => {
	toast.error(t('notifications.general.updateFail'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const noUpdate = () => {
	toast.success(t('notifications.general.noUpdate'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}
