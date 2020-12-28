import React from 'react';
import _ from 'lodash';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {sortData} from '../classroom/formHelpers';
import {getClassList, getStudentList, getQuestionList, createDropdown} from '../helpers/dropdowns';
import {capabilityQuestions} from './constants';
import {getQuestionSet, changeQuestionBtn} from './table';
import {resolveLabel} from '../../utils';
import css from './styles/capability.css';

function filterStudentsByClassId(students, classroomId) {
    return _.filter(students, ['classroom', classroomId]);
}

function CapabilityDropdown({t, capabilityData, classData, students, actions}) {
    const {classDropdown, studentDropdown, questionDropdown, classroom, studentName, questions, classroomId} = capabilityData;
    const classOptions = getClassList(sortData(classData));
    const studentOptions = getStudentList(filterStudentsByClassId(students, classroomId));
    const questionOptions = getQuestionList(t, classroomId, capabilityQuestions, actions);
    const actualSet = getQuestionSet(classroomId, questions);

    return (
        <div className={css.dropdown_main_div}>
            {createDropdown(
                css.dropdown_div,
                classDropdown,
                actions.openCapabilityClassList,
                resolveLabel(classroom, t('general.selectClass')),
                classOptions,
                'classDropdown'
            )}
            {createDropdown(
                css.dropdown_div,
                studentDropdown,
                actions.openCapabilityStudentList,
                resolveLabel(studentName, t('general.selectStudent')),
                studentOptions,
                'studentDropdown'
            )}
            {createDropdown(
                css.dropdown_div,
                questionDropdown,
                actions.openQuestionList,
                resolveLabel(actualSet, t('general.selectQuestions')),
                questionOptions,
                null
            )}
            {changeQuestionBtn(classroomId, actions)}
        </div>
    );
}

const mapStateToProps = state => ({
    capabilityData: state.capabilityData,
    classData:      state.classData,
    students:       state.studentData.students
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CapabilityDropdown));
