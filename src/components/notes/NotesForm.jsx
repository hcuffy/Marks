import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {addNote} from './actions';
import {FooterButtons, getNoteData, TextBoxArea, TitleField} from './formHelpers';

function NotesForm({t, notesData, addNote}) {
    const {studentId, noteId, notes, textArea, textField, isInvalid} = notesData;
    const textBoxText = _.isNull(studentId) ? '' : getNoteData(textArea, noteId, notes, 'note');
    const titleText = _.isNull(studentId) ? '' : getNoteData(textField, noteId, notes, 'title');

    return (
        <form onSubmit={addNote} method='POST'>
            <TitleField t={t} titleText={titleText} studentId={studentId} isInvalid={isInvalid}/>
            <TextBoxArea t={t} textBoxText={textBoxText} isInvalid={isInvalid}/>
            <FooterButtons/>
        </form>
    );
}

const mapStateToProps = state => ({
    notesData: state.notesData
});

const mapDispatchToProps = {addNote};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NotesForm));
