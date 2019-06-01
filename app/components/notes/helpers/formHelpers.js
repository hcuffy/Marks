import React from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'

const noteForm = (actions, { studentId }) => (
	<Form onSubmit={actions.addNote} method="POST">
		<FormGroup row>
			<Label for="textBox" sm={1}>
				Title*:
			</Label>
			<Col sm={10}>
				<Input type="text" name="title" required />
				<Input type="text" data-id={studentId} hidden />
			</Col>
		</FormGroup>
		<FormGroup row>
			<Label for="textBox" sm={1}>
				Notes:
			</Label>
			<Col sm={10}>
				<Input type="textarea" name="note" rows="20" id="textBox" />
			</Col>
		</FormGroup>
		<FormGroup check>
			<Col sm={{ offset: 8 }}>
				<Button type="button" color="danger" data-id={studentId}>
					Delete
				</Button>{' '}
				<Button type="button" color="primary" data-id={studentId}>
					Update
				</Button>{' '}
				<Button type="submit" color="success" disabled={!studentId}>
					Add
				</Button>
			</Col>
		</FormGroup>
	</Form>
)

export default noteForm
