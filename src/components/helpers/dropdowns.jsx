import React from 'react';
import _ from 'lodash';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

import {displayToast} from '../../notifications';
import css from './styles/helpers.css';

export function getClassList(classlist) {
    return _.map(classlist, (data, idx) => (
        <DropdownItem
            key={idx}
            name={data.name}
            data-id={data._id}
            data-check='classDropdown'
        >
            {data.name}
        </DropdownItem>
    ));
}

export function getSubjectList(classroom, subjectData) {
    const selectedSubjects = _.filter(subjectData.data, ['classroomId', classroom.selectedRoom]);

    return _.map(selectedSubjects, (data, idx) => (
        <DropdownItem
            key={idx}
            name={data.name}
            data-id={data._id}
            data-check='subjectDropdown'
        >
            {data.name}
        </DropdownItem>
    ));
}

export function getAllSubjects(subjects) {
    const checkSubject = _.isUndefined(subjects) ? [] : subjects;

    return _.map(checkSubject, (data, idx) => (
        <DropdownItem
            key={idx}
            name={data.name}
            data-id={data._id}
            data-check='subjectDropdown'
        >
            {data.name}
        </DropdownItem>
    ));
}

export function getExamList(exams, subjectId) {
    const selectedExams = _.filter(exams, ['subjectId', subjectId]);

    return _.map(selectedExams, (data, idx) => (
        <DropdownItem
            key={idx}
            name={data.subjectId}
            data-id={data._id}
            data-check='examDropdown'
        >
            {data.title}
        </DropdownItem>
    ));
}

export function getStudentList(allStudents) {
    const students = _.sortBy(_.isUndefined(allStudents) ? [] : allStudents, ['firstname'], ['asc']);

    return _.map(students, (data, idx) => (
        <DropdownItem key={idx} data-id={data._id} data-check='studentDropdown'>
            {`${data.firstname} ${data.lastname}`}
        </DropdownItem>
    ));
}

export function getNotesList(allNotes, studentId) {
    if (_.isNull(studentId) || allNotes.length === 0) {
        return [];
    }

    const notes = _.sortBy(_.filter(allNotes, {studentId}), ['title'], ['asc']);

    return _.map(notes, (data, idx) => {
        const created = _.toString(data.createdAt).substring(4, 15);

        return (
            <DropdownItem key={idx} data-id={data._id} data-check='notesDropdown'>
                {`${data.title} (${created})`}
            </DropdownItem>
        );
    });
}

export function subjectOptions(subjects, actions) {
    return _.map(subjects, (data, idx) => (
        <DropdownItem
            key={idx}
            name={data.name}
            onClick={actions.showSubject}
            data-check='classDropdown'
        >
            {data.name}
        </DropdownItem>
    ));
}

const heightModifier = {
    setMaxHeight: {
        enabled: true,
        fn:      data => ({
            ...data,
            styles: {
                ...data.styles,
                overflow:  'auto',
                maxHeight: 300
            }
        })
    }
};

export function createDropdown(styling, openIt, action, label, options, dataId) {
    return (
        <div className={styling}>
            <Dropdown isOpen={openIt} toggle={action}>
                <DropdownToggle data-check={dataId} className={css.dropdown_color} caret>
                    {label}
                </DropdownToggle>
                <DropdownMenu modifiers={heightModifier}>{options}</DropdownMenu>
            </Dropdown>
        </div>
    );
}

export function notifyIfEmpty(t, options, selected, section) {
    if (_.isEmpty(options) && selected) {
        displayToast(section, 'warn');
    }
}

export function getClassroomProp(prop, classdata) {
    const classObject = _.find(classdata, {prop}) || {};
    if (_.isUndefined(classObject)) {
        return '';
    }

    return classObject.prop;
}

export function getQuestionList(t, classroomId, capabilityQuestions, {updateQuestionSet}) {
    return capabilityQuestions.map((data, idx) => (
        <DropdownItem
            key={idx}
            name={data.name}
            data-id={classroomId}
            onClick={updateQuestionSet}
            data-check='questionDropdown'
        >
            {t(`capability.${data.name}.name`)}
        </DropdownItem>
    ));
}
