import React from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'
import styles from '../styles/notes.css'

const _ = require('lodash')

const getNoteProp = (noteId, notes, prop) => {
	const fullNoteData = _.chain(notes)
		.find({ _id: noteId })
		.value()

	return _.get(fullNoteData, prop)
}

const getTextBoxData = (textBox, noteId, notes) => {
	const noteData = _.isNull(textBox) ? getNoteProp(noteId, notes, 'note') : textBox

	return _.isUndefined(noteData) ? '' : noteData
}
const titleField = (title, studentId) => (
	<FormGroup row>
		<Label for="textBox" sm={1}>
			Title*:
		</Label>
		<Col sm={10}>
			<Input type="text" name="title" required defaultValue={title} />
			<Input type="text" name="student" defaultValue={studentId} hidden />
		</Col>
	</FormGroup>
)
const textBoxArea = (noteInformation, actions) => (
	<FormGroup row>
		<Label for="textBox" sm={1}>
			Notes:
		</Label>
		<Col sm={10}>
			<Input
				type="textarea"
				name="note"
				rows="20"
				id="textBox"
				value={noteInformation}
				onChange={actions.updateTextArea}
			/>
		</Col>
	</FormGroup>
)

const footerBtns = (noteId, studentId, actions) => (
	<FormGroup check>
		<Col sm={{ offset: 7 }}>
			<Button
				type="button"
				color="danger"
				className={styles.clear_Btn}
				onClick={actions.deleteSingleNote}
				data-id={noteId}
				disabled={!noteId}
			>
				Delete
			</Button>{' '}
			<Button
				type="button"
				color="secondary"
				onClick={actions.clearNoteField}
				disabled={!noteId}
			>
				Clear
			</Button>{' '}
			<Button type="button" color="primary" data-id={noteId} disabled={!noteId}>
				Update
			</Button>{' '}
			{/* eslint-disable-next-line max-len */}
			<Button type="submit" color="success" disabled={!studentId || Boolean(noteId)}>
				Add
			</Button>
		</Col>
	</FormGroup>
)

const noteForm = (actions, notesData) => {
	const { studentId, noteId, notes, textBox } = notesData
	const noteInformation = _.isNull(studentId)
		? ''
		: getTextBoxData(textBox, noteId, notes)
	const title = _.isNull(studentId) ? '' : getNoteProp(noteId, notes, 'title')

	return (
		<Form onSubmit={actions.addNote} method="POST">
			{titleField(title, studentId, actions)}
			{textBoxArea(noteInformation, actions)}
			{footerBtns(noteId, studentId, actions)}
		</Form>
	)
}
export default noteForm
