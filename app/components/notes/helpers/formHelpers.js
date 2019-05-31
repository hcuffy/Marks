import React from 'react'
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'
import styles from '../styles/notes.css'

const noteForm = actions => (
	<Form onSubmit={actions.addNote} method="POST">
		<FormGroup row>
			<Label for="textBox" sm={1}>
				Title*:
			</Label>
			<Col sm={10}>
				<Input type="text" name="title" required />
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
				<Button type="button" color="danger">
					Delete
				</Button>{' '}
				<Button type="button" color="primary">
					Update
				</Button>{' '}
				<Button type="submit" color="success">
					Add
				</Button>
			</Col>
		</FormGroup>
	</Form>
)

export default noteForm
