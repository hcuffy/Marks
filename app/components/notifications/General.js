// @flow
import { toast } from 'react-toastify'

export const saveSuccessful = () => {
  toast.success('Your data was saved successfully.',{
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false
  })
}

export const saveError = () => {
  toast.error('Your data could not be saved.',{
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false
  })
}
