export const classroomDropdownInvalid = {
	target: {
		'data-check': null,
		getAttribute(value) {
			return this[value]
		}
	}
}

export const classroomDropdownValid = {
	target: {
		'data-check': 'classDropdown',
		innerText: 'Class 2',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const newSubject = {
	target: {
		name: { value: 'English' },
		abbreviation: { value: 'ENG101' },
		room: { value: 'Class 1' },
		getAttribute(value) {
			return this[value]
		}
	}
}

export const singleSubject = {
	target: {
		innerText: 'German',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const showModal = {
	target: {
		'data-id': 'jfMn575HFbnsj394',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const deleteSubject = {
	target: {
		'data-id': 'jfMn575HFbnsj394',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const updateSubject = {
	target: {
		name: { value: 'English' },
		abbreviation: { value: 'ENG 101' },
		classroomId: {
			'data-id': 'JB4874hdfsjd845e',
			getAttribute(value) {
				return this[value]
			}
		},
		subjectId: {
			'data-id': 'DGfh5475bnf854hfgrf',
			getAttribute(value) {
				return this[value]
			}
		},
		getAttribute(value) {
			return this[value]
		}
	}
}
