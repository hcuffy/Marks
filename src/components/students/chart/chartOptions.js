import {gradingSystem} from '../../graphs/chartData';

function yAxisTicks(settings) {
    const chosenSystem = gradingSystem(settings);
    if (chosenSystem === 'note') {
        return {reverse: true, min: 1, max: 6, stepSize: 1};
    }
    if (chosenSystem === 'points') {
        return {reverse: false, min: 0, max: 15, stepSize: 1};
    }
    if (chosenSystem === 'percent') {
        return {reverse: false, min: 0, max: 100};
    }

    return {reverse: true, min: 1, max: 6, stepSize: 1};
}

export function chartOptions(settings) {
    return {
        maintainAspectRatio: false,
        scales:              {
            yAxes: [
                {
                    ticks: yAxisTicks(settings)
                }
            ],
            xAxes: [
                {
                    type: 'time',
                    time: {
                        unit:           'week',
                        displayFormats: {
                            week: 'll'
                        }
                    }
                }
            ]
        }
    };
}
