import { toast } from 'react-toastify'

export const selectClassroom = () => {
	toast.warn('First select a class.', {
		position: 'top-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}
