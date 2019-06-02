import React from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'

const _ = require('lodash')

const getNoteTitle = (noteId, notes, wanted) => {
	const fullNoteData = _.chain(notes)
		.find({ _id: noteId })
		.value()

	return _.get(fullNoteData, wanted)
}

const footerBtns = (noteId, studentId, actions) => (
	<FormGroup check>
		<Col sm={{ offset: 8 }}>
			<Button
				type="button"
				color="danger"
				onClick={actions.deleteSingleNote}
				data-id={noteId}
				disabled={!noteId}
			>
				Delete
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
	const noteInformation = _.isNull(textBox)
		? getNoteTitle(noteId, notes, 'note')
		: textBox

	return (
		<Form onSubmit={actions.addNote} method="POST">
			<FormGroup row>
				<Label for="textBox" sm={1}>
					Title*:
				</Label>
				<Col sm={10}>
					<Input
						type="text"
						name="title"
						required
						defaultValue={getNoteTitle(noteId, notes, 'title')}
					/>
					<Input type="text" name="student" defaultValue={studentId} hidden />
				</Col>
			</FormGroup>
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
			{footerBtns(noteId, studentId, actions)}
		</Form>
	)
}
export default noteForm
