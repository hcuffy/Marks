import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {Select} from '@blueprintjs/select';
import {Button, MenuItem, Intent} from '@blueprintjs/core';

import css from './styles/helpers.css';

function menuItems(item, {handleClick}) {
    return (
        <MenuItem
            key={item.key}
            text={item.name}
            onClick={handleClick}
            shouldDismissPopover={true}
        />
    );
}

export function DropdownComponent({items, action, label, disabled = false}) {
    return (
        <div>
            <Select
                itemRenderer={menuItems}
                items={items}
                onItemSelect={action}
                filterable={false}
                disabled={disabled}
                popoverProps={{popoverClassName: css.menu_sizing, modifiers: {arrow: {enabled: false}}}}>

                <Button className={css.dropdown_btn} intent={Intent.SUCCESS} text={label} rightIcon='caret-down' />
            </Select>
        </div>
    );
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

function examItems(dataList, dropDown) {
    return _.map(dataList, (data, idx) => (
        {
            key:          idx,
            name:         data.title,
            subjectId:    data.subjectId,
            id:           data?._id,
            'data-check': dropDown
        }
    ));
}

function notesItems(dataList, dropDown) {
    return _.map(dataList, (data, idx) => (
        {
            key:          idx,
            name:         `${data?.title} - ${moment(data.createdAt).format('L')}`,
            title:        data?.title,
            studentId:    data?.studentId,
            id:           data?._id,
            note:         data?.note,
            'data-check': dropDown
        }
    ));
}

function questionItems(data, dropDown) {
    const {t, classroomId, capabilityQuestions} = data;

    return _.map(capabilityQuestions, (data, idx) => (
        {
            key:          idx,
            name:         t(`capability.${data.name}.name`),
            title:        data?.name,
            'data-id':    classroomId,
            'data-check': dropDown
        }
    ));
}

export function createDropdownItems(dataList, dropDown) {
    if (dropDown === 'studentDropdown') {
        return studentItems(dataList, dropDown);
    }

    if (dropDown === 'examDropdown') {
        return examItems(dataList, dropDown);
    }

    if (dropDown === 'notesDropdown') {
        return notesItems(dataList, dropDown);
    }

    if (dropDown === 'questionDropdown') {
        return questionItems(dataList, dropDown);
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
