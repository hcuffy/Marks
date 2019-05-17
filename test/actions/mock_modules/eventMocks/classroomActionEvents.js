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
		name: 'Class 1',
		teacher: 'Sara Tester',
		code: 'CLS2',
		substitute: 'John Tester',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const updateClassroom = {
	target: {
		name: { value: 'Class 2' },
		teacher: { value: 'John Tester' },
		code: { value: 'CLS2' },
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
