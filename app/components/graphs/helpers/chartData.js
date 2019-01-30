const chartLabels = () => ['One',
	'Two',
	'Three',
	'Four',
	'Five',
	'Six']

const filteredData = () => [3,
	4,
	10,
	6,
	7,
	3]

export const chartData = () => ({
	labels: chartLabels(),
	datasets: [
		{
			label: 'School Grades',
			data: filteredData(),
			backgroundColor: [
				'rgba(255, 99, 132, 0.6)',
				'rgba(54, 162, 235, 0.6)',
				'rgba(255, 206, 86, 0.6)',
				'rgba(75, 192, 192, 0.6)',
				'rgba(153, 102, 255, 0.6)',
				'rgba(255, 159, 64, 0.6)',
				'rgba(255, 99, 132, 0.6)'
			]
		}
	]
})
