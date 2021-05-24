import React from 'react';
import _ from 'lodash';

export function getClassOptions(classInfo) {
    return _.values(classInfo).map((data, idx) => (
        <option key={idx}>
            {data.name}
        </option>
    ));
}

export function getSubjectOptions(subjectData, examData, sortedData) {
    let {classroom} = examData;

    classroom = _.isNull(classroom) ? sortedData[0]?.name : classroom;
    console.log(classroom);
    const classroomObject = _.find(sortedData, {name: classroom}) || {};
    const filteredSubject = _.filter(subjectData?.data, ['classroomId', classroomObject?._id]);

    return _.values(filteredSubject).map((data, idx) => (
        <option key={idx} data-id={data._id}>
            {data.abbreviation}
        </option>
    ));
}
