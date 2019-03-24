import { toast } from 'react-toastify'
import i18next from 'i18next'

const t = translate => i18next.t(translate)

export const saveSuccessful = t => {
	toast.success(t('notifications.general.saveSuccess'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const saveFailed = t => {
	toast.error(t('notifications.general.saveFail'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const unableToRetrieve = t => {
	toast.success(t('notifications.general.retrieveFail'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const entryAlreadyExists = t => {
	toast.error(t('notifications.general.exists'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const deletionSuccessful = t => {
	toast.success(t('notifications.general.deleteSuccess'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const deletionFailed = t => {
	toast.error(t('notifications.general.deleteFail'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const updateSuccessful = t => {
	toast.success(t('notifications.general.updateSuccess'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const updateFailed = t => {
	toast.error(t('notifications.general.updateFail'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const noUpdate = t => {
	toast.success(t('notifications.general.noUpdate'), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}
