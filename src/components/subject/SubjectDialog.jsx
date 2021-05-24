import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {deleteSingleSubject, displaySubjectDialog, updateSubject} from './actions';
import {resolveHiddenInput, determineSubjectInputs} from './formHelpers';
import {DialogFrame, DialogInputs} from '../helpers';

function SubjectDialog({t, filteredData, subjectDialogData, deleteSingleSubject, displaySubjectDialog, updateSubject}) {
    const {id, showDialog, isInvalid} = subjectDialogData;
    const selection = determineSubjectInputs(filteredData, id, subjectDialogData);
    const subjectInputs = <DialogInputs t={t} selection={selection} isInvalid={isInvalid} label={'room'}/>;
    const hiddenInput = resolveHiddenInput(filteredData, id);
    const footerData = {dataId: id, nameId: null, deleteAction: deleteSingleSubject};

    return (
        <div>
            {DialogFrame(t, showDialog, updateSubject, subjectInputs, hiddenInput, footerData, displaySubjectDialog)}
        </div>
    );
}

const mapStateToProps = state => ({subjectDialogData: state.subjectDialogData});

const mapDispatchToProps = {deleteSingleSubject, displaySubjectDialog, updateSubject};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SubjectDialog));
