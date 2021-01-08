import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {generateExamForm, getClassOptions, getSubjectOptions} from './formHelper';
import {sortByName} from '../helpers';

function ExamForm({t, classData, subjectData, examData, actions}) {
    const sortedData = sortByName(classData);
    const classOption = getClassOptions(sortedData);
    const subjectOptions = getSubjectOptions(subjectData, examData, sortedData);
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
