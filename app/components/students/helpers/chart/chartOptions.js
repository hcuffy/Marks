import { gradingSystem } from '../../../graphs/helpers/chartData'

const yAxisTicks = settings => {
	const chosenSystem = gradingSystem(settings)

	switch (chosenSystem) {
	case 'note':
		return { reverse: true, min: 1, max: 6 }
	case 'points':
		return { reverse: false, min: 0, max: 15 }
	case 'percent':
		return { reverse: false, min: 0, max: 100 }
	default:
		return { reverse: true, min: 1, max: 6 }
	}
}

export const chartOptions = settings => ({
	maintainAspectRatio: false,
	scales: {
		yAxes: [
			{
				ticks: yAxisTicks(settings)
			}
		],
		xAxes: [
			{
				type: 'time',
				time: {
					unit: 'week',
					displayFormats: {
						week: 'll'
					}
				}
			}
		]
	}
})
