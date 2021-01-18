import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {filterObjectData} from '../classroom/formHelpers';
import {DialogFrame} from '../helpers';
import {resolveHiddenInputs, DialogInputs} from './dialogHelper';

const ExamDialog = ({t, examData, actions}) => {
    const {showDialog, examId, exams, subjectId} = examData;
    const selection = filterObjectData(exams, examId);
    const examInputs = <DialogInputs t={t} selection={selection} examData={examData}/>;
    const hiddenInputs = resolveHiddenInputs(subjectId, examId);
    const {deleteSingleExam, showExamDialog, updateExam} = actions;
    const footerData = {dataId: examId, nameId: subjectId, deleteAction: deleteSingleExam};

    return (
        <div>
            {DialogFrame(t, showDialog, updateExam, examInputs, hiddenInputs, footerData, showExamDialog)}
        </div>
    );
};

const mapStateToProps = state => ({
    examData: state.examData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ExamDialog));
