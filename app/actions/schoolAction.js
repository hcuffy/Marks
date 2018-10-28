// @flow
import { toast } from 'react-toastify'
import { HANDLE_SCHOOL_DATA, DISPLAY_SCHOOL_DATA } from './actionTypes'
import { addSchoolData, getSchoolData } from '../database/schoolDB'

export const handleSchoolData = event => {
  event.preventDefault()

  const formData = {
    Title: event.target.title.value,
    Street: event.target.street.value,
    Province: event.target.schoolstate.value,
    Country: event.target.country.value,
    Zip: event.target.zip.value,
    Year: event.target.year.value
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
