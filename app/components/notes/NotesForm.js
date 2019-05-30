import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap'
import { actionCreators } from '../../actions/index'
import styles from './styles/notes.css'

const NotesForm = ({ studentData, actions }) => (
	<div>
		<Form>
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
					<Input type="textarea" name="description" rows="20" id="textBox" />
				</Col>
			</FormGroup>
			<FormGroup check>
				<Col sm={{ offset: 8 }}>
					<Button type="button" color="danger">
						Delete
					</Button>{' '}
					<Button type="submit" color="primary">
						Update
					</Button>{' '}
					<Button type="submit" color="success">
						Add
					</Button>
				</Col>
			</FormGroup>
		</Form>
	</div>
)

export default connect(
	null,
	null
)(NotesForm)
