import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {FooterButtons, getNoteData, TextBoxArea, TitleField} from './formHelpers';

function NotesForm({t, notesData, actions}) {
    const {studentId, noteId, notes, textArea, textField, isInvalid} = notesData;
    const textBoxText = _.isNull(studentId) ? '' : getNoteData(textArea, noteId, notes, 'note');
    const titleText = _.isNull(studentId) ? '' : getNoteData(textField, noteId, notes, 'title');

    return (
        <form onSubmit={actions.addNote} method='POST'>
            <TitleField t={t} titleText={titleText} studentId={studentId} isInvalid={isInvalid} actions={actions}/>
            <TextBoxArea t={t} textBoxText={textBoxText} isInvalid={isInvalid} actions={actions} />
            <FooterButtons t={t} noteId={noteId} studentId={studentId} actions={actions}/>
        </form>
    );
}

const mapStateToProps = state => ({
    notesData: state.notesData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NotesForm));
