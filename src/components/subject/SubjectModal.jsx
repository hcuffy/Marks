import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {selectedSubject, resolveHiddenInput, determineSubjectInputs} from './formHelpers';
import {modalFrame} from '../helpers/editModal';
import {actionCreators} from '../../actions/index';

function SubjectModal({t, filteredData, subjectModalData, actions}) {
    const {id, showSubjectModal, isInvalid} = subjectModalData;
    const requiredSubject = determineSubjectInputs(filteredData, id, subjectModalData);
    const subjectFields = selectedSubject(t, requiredSubject, isInvalid);
    const hiddenInput = resolveHiddenInput(filteredData, id);

    const footerData = {
        dataId:       id,
        nameId:       null,
        closeId:      id,
        deleteAction: actions.deleteSingleSubject,
        closeAction:  actions.subjectModalDisplay
    };

    return (
        <div>
            {modalFrame(
                t,
                showSubjectModal,
                actions.updateSubject,
                subjectFields,
                hiddenInput,
                footerData
            )}
        </div>
    );
}

const mapStateToProps = state => ({subjectModalData: state.subjectModalData});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SubjectModal));
