// @flow
import { toast } from 'react-toastify'
import { HANDLE_SCHOOL_DATA, DISPLAY_SCHOOL_DATA } from './actionTypes'
import { addSchoolData, getSchoolData } from '../database/schoolDB'

export const handleSchoolData = event => {
  event.preventDefault()

  const formData = {
    title: event.target.title.value,
    street: event.target.street.value,
    schoolstate: event.target.schoolstate.value,
    country: event.target.country.value,
    zip: event.target.zip.value,
    year: event.target.year.value
  }

  addSchoolData(formData)

  return {
    type: HANDLE_SCHOOL_DATA,
    payload: { schoolData: formData }
  }
}

export const displaySchoolData = () => async dispatch => {
  const data = await getSchoolData()
  if (data.length !== 0) {
    dispatch({
      type: DISPLAY_SCHOOL_DATA,
      payload: { schoolData: data }
    })
  }
}
