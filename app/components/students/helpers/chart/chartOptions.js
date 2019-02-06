export const chartOptions = () => ({
	maintainAspectRatio: false,
	scales: {
		yAxes: [
			{
				ticks: {
					reverse: true,
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
