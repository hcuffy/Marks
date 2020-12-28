import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {Bar} from 'react-chartjs-2';

import {actionCreators} from '../../actions/index';
import {chartData} from './chartData';
import {chartOptions} from './chartOptions';
import css from './styles/graphs.css';

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

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Chart));
