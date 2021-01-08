import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {resolveHiddenInput, determineSubjectInputs} from './formHelpers';
import {DialogFrame, DialogInputs} from '../helpers';
import {actionCreators} from '../../actions/index';

function SubjectDialog({t, filteredData, subjectDialogData, actions}) {
    const {id, showDialog, isInvalid} = subjectDialogData;
    const selection = determineSubjectInputs(filteredData, id, subjectDialogData);
    const subjectInputs = <DialogInputs t={t} selection={selection} isInvalid={isInvalid} label={'room'}/>;
    const hiddenInput = resolveHiddenInput(filteredData, id);
    const {deleteSingleSubject, displaySubjectDialog, updateSubject} = actions;
    const footerData = {dataId: id, nameId: null, deleteAction: deleteSingleSubject};

    return (
        <div>
            {DialogFrame(t, showDialog, updateSubject, subjectInputs, hiddenInput, footerData, displaySubjectDialog)}
        </div>
    );
}

const mapStateToProps = state => ({subjectDialogData: state.subjectDialogData});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SubjectDialog));
