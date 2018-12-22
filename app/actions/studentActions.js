export const addNewStudent = event => {
	event.preventDefault()

	const formData = {
		First_Name: event.target.First_Name.value,
		Last_Name: event.target.Last_Name.value,
		Gender: event.target.Gender.value,
		Classroom: event.target.Classroom.value
	}

	event.target.reset()
	console.log(formData)
}
