import { HANDLE_SCHOOL_DATA, DISPLAY_SCHOOL_DATA } from '../constants/actionTypes'
import { addSchoolData, getSchoolData } from '../database/schoolCollection'

export const handleSchoolData = event => {
	event.preventDefault()

	const formData = {
		Title: event.target.Title.value,
		Street: event.target.Street.value,
		Province: event.target.Province.value,
		Country: event.target.Country.value,
		Zip: event.target.Zip.value,
		Year: event.target.Year.value
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
			payload: data[0]
		})
	}
}
