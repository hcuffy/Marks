import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import _ from 'lodash';
import {Button, InputGroup, ButtonGroup, FormGroup, Intent, TextArea} from '@blueprintjs/core';

import {deleteSingleNote, clearNoteField, updateNote} from './actions';
import css from './style.css';

function getNoteProp(noteId, notes, prop) {
    const fullNoteData = _.chain(notes).find({_id: noteId}).value();

    return _.get(fullNoteData, prop);
}

export function getNoteData(textData, noteId, notes, propToGet) {
    const noteData = _.isNull(textData) ? getNoteProp(noteId, notes, propToGet) : textData;

    return _.isUndefined(noteData) ? '' : noteData;
}

export function TitleField({t, titleText, studentId, isInvalid}) {
    const intent = isInvalid && _.isEmpty(titleText) ? Intent.DANGER : Intent.NONE;

    return (
        <div >
            <FormGroup inline={true} labelFor={'id'} label={t('notes.title')}>
                <InputGroup
                    name='title'
                    id='title'
                    type='text'
                    className={css.note_input}
                    defaultValue={titleText}
                    intent={intent}
                />
                <InputGroup type='text' name='student' defaultValue={studentId} hidden/>
            </FormGroup>
        </div>
    );
}

export function TextBoxArea({t, textBoxText, isInvalid}) {
    const intent = isInvalid && _.isEmpty(textBoxText) ? Intent.DANGER : Intent.NONE;

    return (
        <div className={css.note_textArea_wrapper}>
            <FormGroup inline={true} labelFor={'textBox'} label={t('notes.textbox')}>
                <TextArea
                    large={true}
                    name='note'
                    id='textBox'
                    intent={intent}
                    className={css.note_textArea}
                    growVertically={false}
                    defaultValue={textBoxText}
                    rows={15}
                />
            </FormGroup>
        </div>
    );
}

function FooterButtonsComponent({t, noteId, studentId, deleteSingleNote, clearNoteField, updateNote}) {
    return (
        <div className={css.button_footer}>
            <ButtonGroup >
                <Button
                    type='button'
                    large={true}
                    intent={Intent.DANGER}
                    onClick={deleteSingleNote}
                    text= {t('general.delete')}
                    data-id={noteId}
                    disabled={!noteId}/>

                <Button type='button'
                    large={true}
                    intent={Intent.NONE}
                    onClick={clearNoteField}
                    text={t('general.clear')}
                    disabled={!noteId}/>

                <Button
                    type='button'
                    large={true}
                    intent={Intent.PRIMARY}
                    onClick={updateNote}
                    text={t('general.update')}
                    data-id={noteId}
                    disabled={!noteId}/>

                <Button
                    type='submit'
                    large={true}
                    intent={Intent.SUCCESS}
                    text={t('general.add')}
                    disabled={!studentId || Boolean(noteId)}/>
            </ButtonGroup>
        </div>
    );
}

const mapStateToProps = state => ({
    noteId:    state.notesData?.noteId,
    studentId: state.notesData?.studentId
});

const mapDispatchToProps = {deleteSingleNote, clearNoteField, updateNote};

export const FooterButtons = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(FooterButtonsComponent));
