import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {resolveLabel} from '../../utils';
import {actionCreators} from '../../actions/index';
import {sortData} from '../classroom/formHelpers';
import {getClassList, getSubjectList, createDropdown, getClassroomName} from '../helpers/dropdowns';
import css from './styles/exam.css';

function ExamListDropdown({t, classData, examData, subjectData, actions}) {
    const {classroomId, selectedSubject, openClassDropdown, openSubList} = examData;
    const cleanedClassList = sortData(classData);
    const classOptions = getClassList(cleanedClassList);
    const classroom = _.isNull(classroomId) ? classroomId : getClassroomName(classroomId, classData.classData);
    const subjectOptions = getSubjectList({selectedRoom: classroomId}, subjectData);

    return (
        <div className={css.dropdown_main_div}>
            {createDropdown(
                css.dropdown_div,
                openClassDropdown,
                actions.openClassDropdownList,
                resolveLabel(classroom, t('general.selectClass')),
                classOptions,
                'classDropdown'
            )}
            {createDropdown(
                css.dropdown_div,
                openSubList,
                actions.displayExamData,
                resolveLabel(selectedSubject, t('general.selectSubject')),
                subjectOptions,
                'subjectDropdown'
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    classData:   state.classData,
    subjectData: state.subjectData,
    examData:    state.examData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ExamListDropdown));
