export const classDropdownInvalid = {
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

export const subjectDropdownInvalid = {
	target: {
		'data-check': null,
		'data-id': 'DGM36hf84hN840e',
		innerText: 'Mathematics',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const subjectDropdownValid = {
	target: {
		'data-check': 'subjectDropdown',
		'data-id': 'DGM36hf84hN840e',
		innerText: 'Mathematics',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const examDropdownInvalid = {
	target: {
		'data-check': null,
		'data-id': 'PHn7Dj)kMM38Hd',
		innerText: 'EXAM1',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const examDropdownValid = {
	target: {
		'data-check': 'examDropdown',
		'data-id': 'PHn7DjkMM38Hd',
		innerText: 'EXAM1',
		getAttribute(value) {
			return this[value]
		}
	}
}
