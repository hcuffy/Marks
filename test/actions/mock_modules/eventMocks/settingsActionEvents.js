export const changeSystem = {
	target: {
		value: 'points',
		getAttribute(value) {
			return this[value]
		}
	}
}

export const address = {
	target: {
		title: { value: 'Saal School' },
		street: { value: 'Saal an der Donau' },
		province: { value: 'Kelheim' },
		country: { value: 'Germany' },
		zip: { value: '93336' },
		year: { value: '2020' },
		getAttribute(value) {
			return this[value]
		}
	}
}
