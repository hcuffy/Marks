import React from 'react';
import moment from 'moment';
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';

import {chartData} from './chart/chartData';
import {chartOptions} from './chart/chartOptions';
import {getUserLocale} from '../../utils';
import css from './style.css';

function StudentChart({t, studentData, exams, grades, settings}) {
    moment.locale(getUserLocale());

    return (
        <div className={css.chart}>
            <Line
                data={chartData(t, studentData, grades, exams)}
                options={chartOptions(settings)}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    studentData: state.studentData,
    grades:      state.graphData.grades,
    exams:       state.graphData.exams,
    settings:    state.settingData
});

export default connect(mapStateToProps, null)(StudentChart);
