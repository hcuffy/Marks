export const changeTab = {
	target: {
		'data-name': 'examTab',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const newUser = {
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
