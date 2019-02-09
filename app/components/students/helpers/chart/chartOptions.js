export const chartOptions = () => ({
	maintainAspectRatio: false,
	scales: {
		yAxes: [
			{
				ticks: {
					reverse: true,
					min: 1,
					max: 6
				}
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
