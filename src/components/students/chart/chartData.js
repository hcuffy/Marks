import _ from 'lodash';

import {filterBySubject} from '../../graphs/chartData';
import {resolveLabel} from '../../../utils';

function filteredGrades({studentId}, grades) {
    const data = [];
    const studentGrades = _.sortBy(
        _.filter(grades, grade => grade?.studentId === studentId && grade?.grade > 0), ['date']
    );

    for (let i = 0; i < studentGrades.length; i += 1) {
        data.push({
            t: studentGrades[i].date,
            y: studentGrades[i].grade
        });
    }

    return data;
}

function filterSubjectGrades({studentId, subjectId}, exams, grades) {
    const allSubjectsGrade = filterBySubject(subjectId, exams, grades);

    return _.filter(allSubjectsGrade, {studentId});
}

export function chartHeader(t, {studentName, subjectName, chartToDisplay}) {
    if (chartToDisplay === null || chartToDisplay === 'student') {
        return resolveLabel(studentName, t('student.defaultHeader'));
    }

    if (_.isNull(studentName)) {
        return 'Student Grades';
    }

    return `${studentName} - ${subjectName}`;
}

export function chartData(t, studentData, grades, exams) {
    const checkedGrades = [];
    const {chartToDisplay} = studentData;

    if (chartToDisplay === 'student') {
        if (!_.isUndefined(grades)) {
            checkedGrades.push(...grades);
        }
    } else if (chartToDisplay === 'subject') {
        checkedGrades.push(...filterSubjectGrades(studentData, exams, grades));
    }

    return {
        datasets: [
            {
                label:                chartHeader(t, studentData),
                fill:                 false,
                pointHoverRadius:     20,
                pointRadius:          5,
                borderColor:          'rgba(255, 99, 132, 0.6)',
                backgroundColor:      'rgba(255, 99, 132, 0.6)',
                pointBackgroundColor: 'rgba(255, 99, 132, 0.6)',
                data:                 filteredGrades(studentData, checkedGrades)
            }
        ]
    };
}
