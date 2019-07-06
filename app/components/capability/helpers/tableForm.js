import React from 'react'
import { Table, FormGroup, Input, Label, Button } from 'reactstrap'
import styles from '../styles/capability.css'

export const changeQuestionBtn = (classroomId, { openQuestionList }) => (
	<Button
		className={styles.change_Btn}
		type="button"
		color="danger"
		data-check="openButton"
		data-id={classroomId}
		onClick={openQuestionList}
	>
		&#8617;
	</Button>
)

const saveBtn = () => (
	<Button className={styles.save_Btn} type="submit" color="success">
		add
	</Button>
)

const tableForm = () => {
	const tableFields = (
		<div className={styles.form_div}>
			<form>
				<Table>
					<thead>
						<tr>
							<th colSpan="6">Student Capability Questions PlaceHolder</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th colSpan="6">Mathematics</th>
						</tr>
						<tr>
							<th colSpan="6">Can you add?</th>
						</tr>
						<tr>
							<td className={styles.radio_td}>
								<FormGroup check>
									<Label className={styles.radio_label} check>
										This is better than the other
									</Label>
									<Input type="radio" name="radio1" />
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
				{saveBtn()}
			</form>
		</div>
	)

	return tableFields
}

export default tableForm
