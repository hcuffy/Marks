import { HANDLE_SCHOOL_DATA, DISPLAY_SCHOOL_DATA } from '../constants/actionTypes'
import { addSchoolData, getSchoolData } from '../database/schoolCollection'

export const handleSchoolData = event => dispatch => {
	event.preventDefault()

	const formData = {
		title: event.target.title.value,
		street: event.target.street.value,
		province: event.target.province.value,
		country: event.target.country.value,
		zip: event.target.zip.value,
		year: event.target.year.value
	}

	addSchoolData(formData)

	dispatch({
		type: HANDLE_SCHOOL_DATA,
		payload: { schoolData: formData }
	})
}

export const displaySchoolData = () => async dispatch => {
	const data = await getSchoolData()
	if (data.length !== 0) {
		dispatch({
			type: DISPLAY_SCHOOL_DATA,
			payload: data[0]
		})
	}
}
