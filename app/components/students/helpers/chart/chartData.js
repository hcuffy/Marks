export const chartData = () => ({
	datasets: [
		{
			label: 'Student Grade',
			fill: false,
			pointHoverRadius: 20,
			pointRadius: 5,
			borderColor: 'rgba(255, 99, 132, 0.6)',
			backgroundColor: 'rgba(255, 99, 132, 0.6)',
			pointBackgroundColor: 'rgba(255, 99, 132, 0.6)',
			data: [
				{
					t: '2018-01-13',
					y: 1
				},
				{
					t: '2018-03-13',
					y: 2
				},
				{
					t: '2018-04-13',
					y: 3
				},
				{
					t: '2018-09-13',
					y: 4
				},
				{
					t: '2018-10-13',
					y: 1
				},
				{
					t: '2019-03-13',
					y: 2
				}
			]
		}
	]
})
