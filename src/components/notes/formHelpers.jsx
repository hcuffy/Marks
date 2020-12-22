import React from 'react';
import _ from 'lodash';
import {Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';

import css from './styles/notes.css';

function getNoteProp(noteId, notes, prop) {
    const fullNoteData = _.chain(notes).find({_id: noteId}).value();

    return _.get(fullNoteData, prop);
}

function getNoteData(textData, noteId, notes, propToGet) {
    const noteData = _.isNull(textData) ? getNoteProp(noteId, notes, propToGet) : textData;

    return _.isUndefined(noteData) ? '' : noteData;
}

function titleField(t, title, studentId, isInvalid, actions) {
    return (
        <FormGroup row>
            <Label for='textBox' sm={1}>
                {t('notes.title')}*:
            </Label>
            <Col sm={10}>
                <Input
                    type='text'
                    name='title'
                    value={title}
                    onChange={actions.updateTitleField}
                    invalid={isInvalid && _.isEmpty(title)}
                />

                <Input type='text' name='student' defaultValue={studentId} hidden />
            </Col>
        </FormGroup>
    );
}

function textBoxArea(t, noteInformation, isInvalid, actions) {
    return (
        <FormGroup row>
            <Label for='textBox' sm={1}>
                {t('notes.textbox')}:
            </Label>
            <Col sm={10}>
                <Input
                    type='textarea'
                    name='note'
                    rows='20'
                    id='textBox'
                    value={noteInformation}
                    onChange={actions.updateTextArea}
                    invalid={isInvalid && _.isEmpty(noteInformation)}
                />
            </Col>
        </FormGroup>
    );
}

function footerButtons(t, noteId, studentId, actions) {
    return (
        <FormGroup check>
            <Col sm={{offset: 7}}>
                <Button
                    type='button'
                    color='danger'
                    className={css.clear_Btn}
                    onClick={actions.deleteSingleNote}
                    data-id={noteId}
                    disabled={!noteId}
                >
                    {t('general.delete')}
                </Button>{' '}
                <Button
                    type='button'
                    color='secondary'
                    onClick={actions.clearNoteField}
                    disabled={!noteId}
                >
                    {t('general.clear')}
                </Button>{' '}
                <Button
                    type='button'
                    color='primary'
                    data-id={noteId}
                    onClick={actions.updateNote}
                    disabled={!noteId}
                >
                    {t('general.update')}
                </Button>{' '}
                <Button
                    type='submit'
                    color='success'
                    formNoValidate
                    disabled={!studentId || Boolean(noteId)}
                >
                    {t('general.add')}
                </Button>
            </Col>
        </FormGroup>
    );
}

function noteForm(t, actions, notesData) {
    const {studentId, noteId, notes, textBox, textField, isInvalid} = notesData;
    const textBoxText = _.isNull(studentId) ? '' : getNoteData(textBox, noteId, notes, 'note');
    const titleText = _.isNull(studentId) ? '' : getNoteData(textField, noteId, notes, 'title');

    return (
        <Form onSubmit={actions.addNote} method='POST'>
            {titleField(t, titleText, studentId, isInvalid, actions)}

            {textBoxArea(t, textBoxText, isInvalid, actions)}

            {footerButtons(t, noteId, studentId, actions)}
        </Form>
    );
}

export default noteForm;
