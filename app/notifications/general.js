import { toast } from 'react-toastify'

export const saveSuccessful = () => {
	toast.success('The data was saved successfully.', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const saveFailed = () => {
	toast.error('The data could not be saved.', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const unableToRetrieve = () => {
	toast.success('Unable to retireve data from database.', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const entryAlreadyExists = () => {
	toast.error('Data already exists in database.', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const deletionSuccessful = () => {
	toast.success('Deletion was successful.', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const deletionFailed = () => {
	toast.error('Deletion attempt failed.', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const updateSuccessful = () => {
	toast.success('Data update was successful.', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const updateFailed = () => {
	toast.error('Update attempt failed.', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}

export const noUpdate = () => {
	toast.success('No data to update.', {
		position: 'top-right',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}
