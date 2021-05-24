import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {Bar} from 'react-chartjs-2';

import {chartData} from './chartData';
import {chartOptions} from './chartOptions';
import css from './style.css';

function Chart({t, graphData, subjects, settings}) {
    return (
        <div className={css.chart}>
            <Bar
                data={chartData(t, graphData, subjects, settings)}
                options={chartOptions()}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    graphData: state.graphData,
    subjects:  state.subjectData.data,
    settings:  state.settingData
});

export default connect(mapStateToProps, null)(withTranslation()(Chart));
