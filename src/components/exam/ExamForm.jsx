import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {sortData} from '../classroom/formHelpers';
import {generateExamForm, getClassOptions, getSubjectOptions} from './formHelper';

function ExamForm({t, classData, subjectData, examData, actions}) {
    const cleanedClassList = sortData(classData);
    const classOption = getClassOptions(cleanedClassList);
    const subjectOptions = getSubjectOptions(subjectData, examData, cleanedClassList);
    const completedExamForm = generateExamForm(t, subjectOptions, classOption, examData, actions);

    return <div>{completedExamForm}</div>;
}

const mapStateToProps = state => ({
    classData:   state.classData,
    subjectData: state.subjectData,
    examData:    state.examData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ExamForm));