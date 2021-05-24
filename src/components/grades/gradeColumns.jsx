import _ from 'lodash';
import React from 'react';
import moment from 'moment';

import {InputGroup, Icon} from '@blueprintjs/core';
import css from './style.css';

function customCell(props, updateStudentGrade) {
    const {score, studentId, subjectName, subjectId, examId, date, weight, gradeId} = props.value;

    return (
        <InputGroup
            defaultValue={score}
            studentid={studentId}
            subjectname={subjectName}
            subjectid={subjectId}
            examid={examId}
            data-date={date}
            weight={weight}
            id={gradeId}
            type='number'
            fill={true}
            onChange={updateStudentGrade}
        />
    );
}

function badgeColor(weight) {
    if (weight <= 1) {
        return 'badge-success';
    }
    if (weight > 2) {
        return 'badge-primary';
    }

    return 'badge-warning';
}

function customHeader({date, weight}) {
    return (
        <div>
            <span className={`badge badge-pill ${badgeColor(weight)} ${css.badge_weight}`}>
                { <Icon icon='layers' iconSize={13} />}{weight}
            </span>

            <span className={`badge badge-light badge-pill ${css.badge_date}`}>
                { <Icon icon='calendar' iconSize={13}/>}{moment(date).format('L') }
            </span>
        </div>
    );
}

function averageColumn() {
    return {
        Header:   'Ø',
        accessor: 'average',
        width:    50,
        style:    {textAlign: 'center'}
    };
}

function customFooter({data}, iterator) {
    const gradesArray = [];

    for (let i = 0; i < data.length; i += 1) {
        const {score} = data[i]._original.grades[iterator];

        if (parseInt(score, 10) !== 0) {
            gradesArray.push(parseInt(score, 10));
        }
    }

    const examAverage = _.round(_.mean(gradesArray), 2);

    return (
        <span>
            <strong>Ø:</strong> {_.isNaN(examAverage) ? 0 : examAverage}
        </span>
    );
}

function customColumn(data, updateStudentGrade) {
    const columnData = [];

    if (_.isUndefined(data[0])) {
        return null;
    }

    for (let i = 0; i < data[0].grades.length; i += 1) {
        const gradeProps = data[0].grades[i];

        columnData.push({
            Header:   customHeader(gradeProps),
            accessor: `grades[${i}]`,
            width:    150,
            Cell:     props => customCell(props, updateStudentGrade),
            Footer:   props => customFooter(props, i)
        });
    }

    columnData.push(averageColumn());

    return columnData;
}

export function gradeColumns({t, newData, updateStudentGrade}) {
    return [
        {
            Header:  t('grades.studentHeader'),
            columns: [
                {
                    Header:   <Icon icon='user' iconSize={18}/>,
                    accessor: 'gender',
                    width:    40,
                    style:    {textAlign: 'center'}
                },
                {
                    Header:      t('grades.fullName'),
                    accessor:    'name',
                    width:       150,
                    headerStyle: {textAlign: 'left'}
                }
            ]
        },
        {
            Header:  t('grades.examHeader'),
            columns: customColumn(newData, updateStudentGrade)
        }
    ];
}
