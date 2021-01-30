import React from 'react';
import _ from 'lodash';
import {Select} from '@blueprintjs/select';
import {Button, MenuItem, Intent} from '@blueprintjs/core';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

import css from './styles/helpers.css';

// TODO: Remove this function once all dropdowns have been replaced
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
// TODO: Remove this function once all dropdowns have been replaced
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

//TODO: remove this function once all student dropdowns have between replaced
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

// TODO: Remove this function once all dropdowns have been replaced
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

// TODO: Remove this variables once all dropdowns have been replaced
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
// TODO: Remove this function once all dropdowns have been replaced
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

function menuItems(item, {handleClick}) {
    return (
        <MenuItem
            key={item.key}
            text={item.name}
            onClick={handleClick}
            shouldDismissPopover={true}
        />);
}

export function DropdownComponent({items, action, label, disabled = false}) {
    return (
        <div>
            <Select
                itemRenderer={menuItems}
                items={items}
                onItemSelect={action}
                filterable={false}
                disabled={disabled}>
                <Button className={css.dropdown_btn} intent={Intent.SUCCESS} text={label} rightIcon='caret-down' />
            </Select>
        </div>
    );
}

// TODO: Remove this function once all dropdowns have been replaced
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

function studentItems(dataList, dropDown) {
    return _.map(dataList, (data, idx) => (
        {
            key:          idx,
            name:         `${data.firstname} ${data.lastname}`,
            classroomId:  data?.classroom,
            id:           data?._id,
            'data-check': dropDown
        }
    ));
}

export function createDropdownItems(dataList, dropDown) {
    if (dropDown === 'studentDropdown') {
        return studentItems(dataList, dropDown);
    }

    return _.map(dataList, (data, idx) => (
        {
            key:          idx,
            name:         data.name,
            id:           data._id,
            'data-check': dropDown
        }
    ));
}
