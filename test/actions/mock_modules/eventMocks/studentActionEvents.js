export const newStudent = {
	target: {
		gender: {
			selectedIndex: 0,
			options: [
				{
					'data-id': 'male',
					getAttribute(value) {
						return this[value]
					}
				}
			]
		},
		firstname: { value: 'Tester' },
		lastname: { value: 'Blaumann' },
		classroom: { value: 'Class 1' },
		getAttribute(value) {
			return this[value]
		}
	}
}

export const showModal = {
	target: {
		'data-id': 'Dgerhe746dhDSh84',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const studentDropdownInvalid = {
	target: {
		'data-check': null,
		getAttribute(value) {
			return this[value]
		}
	}
}

export const studentDropdownValid = {
	target: {
		'data-check': 'studentDropdown',
		'data-id': 'DF347gfr834fnFe',
		innerText: 'John Tester',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const subjectDropdownInvalid = {
	target: {
		'data-check': null,
		getAttribute(value) {
			return this[value]
		}
	}
}

export const subjectDropdownValid = {
	target: {
		'data-check': 'subjectDropdown',
		'data-id': 'KlfdJ84nd6dGDf833',
		innerText: 'German',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const updateStudent = {
	target: {
		gender: {
			selectedIndex: 1,
			options: [
				{}, {
					'data-id': 'female',
					getAttribute(value) {
						return this[value]
					}
				}
			]
		},
		firstname: { value: 'Tester' },
		lastname: { value: 'Blaumann' },
		classroom: { value: 'Class 1' },
		studentId: {
			'data-id': 'JB4874hdfsjd845e',
			getAttribute(value) {
				return this[value]
			}
		},
		getAttribute(value) {
			return this[value]
		}
	}
}

export const deleteStudent = {
	target: {
		'data-id': 'JB4874hdfsjd845e',
		getAttribute(value) {
			return this[value]
		}
	}
}
