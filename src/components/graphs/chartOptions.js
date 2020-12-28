export function chartOptions() {
    return {
        maintainAspectRatio: false,
        scales:              {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };
}
