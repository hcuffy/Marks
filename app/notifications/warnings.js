import { toast } from 'react-toastify'
import { t } from '../utils/translationUtil'

export const firstMakeSelection = section => {
	toast.warn(t(`${t('notifications.warning.makeSelection')} ${section}.`), {
		position: 'top-right',
		autoClose: 4000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: false
	})
}
