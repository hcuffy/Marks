import { toast } from 'react-toastify'

export const selectClassroom = section => {
	toast.warn(`First select a ${section}.`, {
		position: 'top-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}
