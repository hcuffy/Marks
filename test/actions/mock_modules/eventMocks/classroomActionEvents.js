export const changeTab = {
	target: {
		'data-name': 'examTab',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const newClassroom = {
	target: {
		name: 'Biology',
		teacher: 'Sara Tester',
		code: 'BIO101',
		substitute: 'John Tester',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const updateClassroom = {
	target: {
		name: { value: 'Science' },
		teacher: { value: 'John Tester' },
		code: { value: 'SCI101' },
		substitute: { value: 'Mary Tester' },
		oldName: {
			'data-id': 'FH347hfr8f5fnJs',
			getAttribute(value) {
				return this[value]
			}
		}
	}
}

export const deleteRoom = {
	target: {
		'data-id': 'DF347gfr834fnFe',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const showModal = {
	target: {
		'data-id': 'GrtZ7gGHZ34fn4e',
		getAttribute(value) {
			return this[value]
		}
	}
}
