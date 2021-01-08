import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {resolveLabel, PDFbutton} from '../../utils';
import {getStudentList, getAllSubjects, createDropdown, notifyIfEmpty} from '../helpers';
import css from './styles/students.css';

function StudentDropdown({t, allStudentData, subjectData, actions}) {
    const {
        students,
        studentDropdown,
        subjectDropdown,
        chartToDisplay,
        studentGraphName,
        subjectGraphName
    } = allStudentData;

    const studentOptions = getStudentList(students);
    const subjectOptions = getAllSubjects(subjectData.data);
    const openIt = {subjectDropdown};

    if (chartToDisplay === 'subject' && _.isNull(studentGraphName)) {
        notifyIfEmpty([], true, 'student');
        openIt.subjectDropdown = false;
    }

    return (
        <div className={css.dropdown_main_div}>
            {createDropdown(
                css.dropdown_one,
                studentDropdown,
                actions.openStudentGraph,
                resolveLabel(studentGraphName, t('general.selectStudent')),
                studentOptions,
                'studentDropdown'
            )}
            {createDropdown(
                css.dropdown_two,
                openIt.subjectDropdown,
                actions.openStudentSubjectGraph,
                resolveLabel(subjectGraphName, t('general.selectSubject')),
                subjectOptions,
                'subjectDropdown'
            )}
            {PDFbutton(
                css.pdf_btn,
                t('general.saveAs'),
                resolveLabel(studentGraphName, t('student.defaultHeader'))
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    allStudentData: state.studentData,
    subjectData:    state.subjectData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(StudentDropdown));
