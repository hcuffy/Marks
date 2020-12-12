import React from 'react';
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';
import {chartData} from './helpers/chart/chartData';
import {chartOptions} from './helpers/chart/chartOptions';
import css from './styles/students.css';

const StudentChart = ({t, studentData, exams, grades, settings}) => (
    <div className={css.chart}>
        <Line
            data={chartData(t, studentData, grades, exams)}
            options={chartOptions(settings)}
        />
    </div>
);

const mapStateToProps = state => ({
    studentData: state.studentData,
    grades:      state.graphData.grades,
    exams:       state.graphData.exams,
    settings:    state.settingData
});

export default connect(mapStateToProps, null)(StudentChart);
