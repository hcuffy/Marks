import React from 'react'
import { Table, FormGroup, Input, Label, Button } from 'reactstrap'
import capabilityQuestions from '../../../constants/capabilityQuestions'
import { getQuestionSet } from './helpers'
import styles from '../styles/capability.css'

const _ = require('lodash')

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

const questionOptions = (t, subject) => {
	const numberOfOptions = []
	for (let i = 0; i < 6; i++) {
		numberOfOptions.push(`option${i}`)
	}

	const options = numberOfOptions.map((numberOfOptions, idx) => (
		<td className={styles.radio_td}>
			<FormGroup>
				<Label className={styles.radio_label}>
					{t(`capability.options.${numberOfOptions}`)}
				</Label>
				<Input type="radio" className={styles.radio_input} name={subject} />
			</FormGroup>
		</td>
	))

	return <tr>{options}</tr>
}

const tableForm = (t, classroomId, answers) => {
	const actualSet = getQuestionSet(classroomId, answers)

	const tableFields = (
		<div className={styles.form_div}>
			<form>
				<Table>
					<thead>
						<tr>
							<th colSpan="6">{t('capability.tableHeader')}</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th colSpan="6">Mathematics</th>
						</tr>
						<tr>
							<th colSpan="6">Can you add?</th>
						</tr>
						{questionOptions(t, 'math')}
						<tr>
							<th colSpan="6">Can you sing?</th>
						</tr>
						{questionOptions(t, 'eng')}
					</tbody>
				</Table>
				{saveBtn()}
			</form>
		</div>
	)

	return tableFields
}

export default tableForm
