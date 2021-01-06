import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {selectedSubject, resolveHiddenInput, determineSubjectInputs} from './formHelpers';
import {DialogFrame} from '../helpers';
import {actionCreators} from '../../actions/index';

function SubjectDialog({t, filteredData, subjectDialogData, actions}) {
    const {id, showSubjectModal, isInvalid} = subjectDialogData;
    const requiredSubject = determineSubjectInputs(filteredData, id, subjectDialogData);
    const subjectFields = selectedSubject(t, requiredSubject, isInvalid);
    const hiddenInput = resolveHiddenInput(filteredData, id);

    const footerData = {
        dataId:       id,
        nameId:       null,
        closeId:      id,
        deleteAction: actions.deleteSingleSubject,
        closeAction:  actions.displaySubjectDialog
    };

    return (
        <div>
            {DialogFrame(t, showSubjectModal, actions.updateSubject, subjectFields, hiddenInput, footerData)}
        </div>
    );
}

const mapStateToProps = state => ({subjectDialogData: state.subjectDialogData});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SubjectDialog));
