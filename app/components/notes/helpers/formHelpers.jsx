import React from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'
import css from '../styles/notes.css'

const _ = require('lodash')

const getNoteProp = (noteId, notes, prop) => {
	const fullNoteData = _.chain(notes)
		.find({ _id: noteId })
		.value()

	return _.get(fullNoteData, prop)
}

const getNoteData = (textData, noteId, notes, propToGet) => {
	const noteData = _.isNull(textData)
		? getNoteProp(noteId, notes, propToGet)
		: textData

	return _.isUndefined(noteData) ? '' : noteData
}

const titleField = (t, title, studentId, isInvalid, actions) => (
	<FormGroup row>
		<Label for="textBox" sm={1}>
			{t('notes.title')}*:
		</Label>
		<Col sm={10}>
			<Input
				type="text"
				name="title"
				value={title}
				onChange={actions.updateTitleField}
				invalid={isInvalid && _.isEmpty(title)}
			/>

			<Input type="text" name="student" defaultValue={studentId} hidden />
		</Col>
	</FormGroup>
)

const textBoxArea = (t, noteInformation, isInvalid, actions) => (
	<FormGroup row>
		<Label for="textBox" sm={1}>
			{t('notes.textbox')}:
		</Label>
		<Col sm={10}>
			<Input
				type="textarea"
				name="note"
				rows="20"
				id="textBox"
				value={noteInformation}
				onChange={actions.updateTextArea}
				invalid={isInvalid && _.isEmpty(noteInformation)}
			/>
		</Col>
	</FormGroup>
)

const footerButtons = (t, noteId, studentId, actions) => (
	<FormGroup check>
		<Col sm={{ offset: 7 }}>
			<Button
				type="button"
				color="danger"
				className={css.clear_Btn}
				onClick={actions.deleteSingleNote}
				data-id={noteId}
				disabled={!noteId}
			>
				{t('general.delete')}
			</Button>{' '}
			<Button
				type="button"
				color="secondary"
				onClick={actions.clearNoteField}
				disabled={!noteId}
			>
				{t('general.clear')}
			</Button>{' '}
			<Button
				type="button"
				color="primary"
				data-id={noteId}
				onClick={actions.updateNote}
				disabled={!noteId}
			>
				{t('general.update')}
			</Button>{' '}
			<Button
				type="submit"
				color="success"
				formNoValidate
				disabled={!studentId || Boolean(noteId)}
			>
				{t('general.add')}
			</Button>
		</Col>
	</FormGroup>
)

const noteForm = (t, actions, notesData) => {
	const { studentId, noteId, notes, textBox, textField, isInvalid } = notesData

	const textBoxText = _.isNull(studentId)
		? ''
		: getNoteData(textBox, noteId, notes, 'note')

	const titleText = _.isNull(studentId)
		? ''
		: getNoteData(textField, noteId, notes, 'title')

	return (
		<Form onSubmit={actions.addNote} method="POST">
			{titleField(t, titleText, studentId, isInvalid, actions)}

			{textBoxArea(t, textBoxText, isInvalid, actions)}

			{footerButtons(t, noteId, studentId, actions)}
		</Form>
	)
}
export default noteForm
