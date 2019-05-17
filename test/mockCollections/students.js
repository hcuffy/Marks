export const addNewStudentData = () => true

export const getAllStudents = () => [
	{
		firstname: 'Tester ',
		lastname: 'Baumann',
		gender: 'male',
		classroom: 'Class 1'
	}
]

export const updateStudentData = data => {
	const oldData = {
		firstname: 'Tester ',
		lastname: 'Baumann',
		gender: 'male',
		classroom: 'Class 1'
	}

	return [Object.assign({}, oldData, data)]
}

export const deleteStudent = () => [{}]
