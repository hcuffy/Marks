export const addExam = {
	target: {
		title: { value: 'Math Exam' },
		subject: {
			selectedIndex: 0,
			options: [
				{
					'data-id': 'FH347hfr8f5fnJs',
					getAttribute(value) {
						return this[value]
					}
				}
			]
		},
		date: { value: '2019-11-05' },
		weight: { value: 2 }
	}
}

export const displaySubject = {
	target: {
		value: {
			subject: 'Biology',
			id: 'DF347gfr834fnFe'
		}
	}
}

export const classDropdown = {
	target: {
		'data-check': null,
		innerText: 'Class 1',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const classDropdownValid = {
	target: {
		'data-check': 'classDropdown',
		innerText: 'Class 1',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const subjectDropdown = {
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
		'data-id': 'DF347gfr834fnFe',
		innerText: 'Science',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const singleExam = {
	target: {
		'data-id': 'FBnf7gfr834hf6g',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const updateExam = {
	target: {
		title: 'Exam 1',
		date: '2019-09-08',
		weight: 1,
		subjectId: {
			'data-id': 'LKMD37gfr834f7e',
			getAttribute(value) {
				return this[value]
			}
		},
		examId: {
			'data-id': 'DF347gfr834fnFe',
			getAttribute(value) {
				return this[value]
			}
		}
	}
}

export const deleteExam = {
	target: {
		name: 'LKMD37gfr834f7e',
		'data-id': 'DF347gfr834fnFe',
		getAttribute(value) {
			return this[value]
		}
	}
}
