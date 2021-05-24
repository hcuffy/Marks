import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {deleteSingleExam, showExamDialog, updateExam} from './actions';
import {filterObjectData} from '../classroom/formHelpers';
import {DialogFrame} from '../helpers';
import {resolveHiddenInputs, DialogInputs} from './dialogHelper';

const ExamDialog = ({t, examData, deleteSingleExam, showExamDialog, updateExam}) => {
    const {showDialog, examId, exams, subjectId} = examData;
    const selection = filterObjectData(exams, examId);
    const examInputs = <DialogInputs t={t} selection={selection} examData={examData}/>;
    const hiddenInputs = resolveHiddenInputs(subjectId, examId);
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

const mapDispatchToProps = {deleteSingleExam, showExamDialog, updateExam};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ExamDialog));
