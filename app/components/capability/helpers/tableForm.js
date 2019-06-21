import React from 'react'
import { Table, FormGroup, Input } from 'reactstrap'
import styles from '../styles/capability.css'

const tableForm = (t, subjectOptions, classOption, actions) => {
	const tableFields = (
		<form>
			<Table>
				<thead>
					<tr>
						<th colSpan="6">Student Capability Questions PlaceHolder</th>
					</tr>
				</thead>
				<tbody className={styles.test}>
					<tr>
						<th colSpan="6">Mathematics</th>
					</tr>
					<tr>
						<th colSpan="6">Can you add?</th>
					</tr>
					<tr>
						<td>
							<FormGroup check>
								<Input type="radio" name="radio1" /> Option 1
							</FormGroup>
						</td>
						<td>
							<FormGroup check>
								<Input type="radio" name="radio1" /> Option 2
							</FormGroup>
						</td>
						<td>
							<FormGroup check>
								<Input type="radio" name="radio1" /> Option 3
							</FormGroup>
						</td>
						<td>
							<FormGroup check>
								<Input type="radio" name="radio1" /> Option 4
							</FormGroup>
						</td>
						<td>
							<FormGroup check>
								<Input type="radio" name="radio1" /> Option 5
							</FormGroup>
						</td>
						<td>
							<FormGroup check>
								<Input type="radio" name="radio1" /> Option 6
							</FormGroup>
						</td>
					</tr>
					<tr>
						<th colSpan="6">Can you sing?</th>
					</tr>
					<tr>
						<td>
							<FormGroup check>
								<Input type="radio" name="radio2" /> Option 1
							</FormGroup>
						</td>
						<td>
							<FormGroup check>
								<Input type="radio" name="radio2" /> Option 2
							</FormGroup>
						</td>
						<td>
							<FormGroup check>
								<Input type="radio" name="radio2" /> Option 3
							</FormGroup>
						</td>
						<td>
							<FormGroup check>
								<Input type="radio" name="radio2" /> Option 4
							</FormGroup>
						</td>
						<td>
							<FormGroup check>
								<Input type="radio" name="radio2" /> Option 5
							</FormGroup>
						</td>
						<td>
							<FormGroup check>
								<Input type="radio" name="radio2" /> Option 6
							</FormGroup>
						</td>
					</tr>
					<tr>
						<th colSpan="6">Science</th>
					</tr>
				</tbody>
			</Table>
		</form>
	)

	return tableFields
}

export default tableForm
