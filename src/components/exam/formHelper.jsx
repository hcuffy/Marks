import React from 'react';
import _ from 'lodash';

import {getClassroomProp} from '../helpers';

export function getClassOptions(classInfo) {
    return _.values(classInfo).map((data, idx) => (
        <option key={idx}>
            {data.name}
        </option>
    ));
}

export function getSubjectOptions(subjectData, examData, cleanedClassList) {
    const {subject} = examData;
    const classroom = subject || cleanedClassList[0].name;
    const classroomId = getClassroomProp(classroom, cleanedClassList);
    const filteredSubject = _.filter(subjectData.data, ['classroomId', classroomId]);

    return _.values(filteredSubject).map((data, idx) => (
        <option key={idx} data-id={data._id}>
            {data.abbreviation}
        </option>
    ));
}
