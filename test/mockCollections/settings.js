const savedSettings = {
	note: true,
	points: false,
	percent: false,
	title: 'Tester School',
	street: 'Riedenburger Str',
	province: 'Kelheim',
	country: 'Germany',
	zip: '93309',
	year: '2019'
}

export const updateGradeType = data => [Object.assign({}, savedSettings, data)]
export const getSystemType = () => [savedSettings]
export const addAddress = data => [Object.assign({}, savedSettings, data)]
export const getAddressData = () => [savedSettings]
export const saveGradeSystem = data => [Object.assign({}, savedSettings, data)]
