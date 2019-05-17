export const addSubjectData = data => [data]

export const getAllSubjects = () => [
	{ abbreviation: 'ENG101', name: 'English', room: 'Class 1' }
]

export const deleteSubject = () => [{}]

export const updateSubjectData = data => {
	const oldData = { abbreviation: 'ENG101', name: 'English', room: 'Class 1' }

	return [Object.assign({}, oldData, data)]
}
