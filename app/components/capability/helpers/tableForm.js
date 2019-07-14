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

const createKeys = (numberOfKeys, prefix) => {
	const keys = []
	for (let i = 0; i < numberOfKeys; i += 1) {
		keys.push(`${prefix}${i}`)
	}

	return keys
}

const questionOptions = (t, subject) => {
	const optionsKeys = createKeys(6, 'option')

	const options = optionsKeys.map((capabilityOptions, idx) => (
		<td key={idx} className={styles.radio_td}>
			<FormGroup>
				<Label className={styles.radio_label}>
					{t(`capability.options.${capabilityOptions}`)}
				</Label>
				<Input type="radio" className={styles.radio_input} name={subject} />
			</FormGroup>
		</td>
	))

	return <tr>{options}</tr>
}

const innerTableBody = (t, subjects, actualSet) => {
	const questions = subjects.map((subject, idx) => {
		const subjectKey = _.findKey(subject)
		// const optionsKeys = createKeys(subject[subjectKey].number, 'question')
		const translationStem = `capability.${actualSet}.${subject[subjectKey].short}`

		return (
			<tbody>
				<tr key={idx}>
					<th key={idx} colSpan="6">
						{t(`${translationStem}.subject`)}
					</th>
				</tr>
				{questionOptions(t, subject[subjectKey].short)}
			</tbody>
		)
	})

	return questions
}

const tableQuestions = (t, actualSet) => {
	const developerHolder = 'class5'

	const questionSet = _.find(capabilityQuestions, actualSet)[developerHolder]
	const questionArr = []

	_.forIn(questionSet, (value, key) => {
		questionArr.push({ [key]: value })
	})

	return innerTableBody(t, questionArr, developerHolder)
}

const tableForm = (t, classroomId, answers) => {
	const tableBody = tableQuestions(t, getQuestionSet(classroomId, answers))

	const tableFields = (
		<div className={styles.form_div}>
			<form>
				<Table>
					<thead>
						<tr>
							<th colSpan="6">{t('capability.tableHeader')}</th>
						</tr>
					</thead>
					{tableBody}
				</Table>
				{saveBtn()}
			</form>
		</div>
	)

	return tableFields
}

export default tableForm

// <tbody>
// 	<tr>
// 		<th colSpan="6">Mathematics</th>
// 	</tr>
// 	<tr>
// 		<th colSpan="6">Can you add?</th>
// 	</tr>
// 	{questionOptions(t, 'math')}
// 	<tr>
// 		<th colSpan="6">Can you sing?</th>
// 	</tr>
// 	{questionOptions(t, 'eng')}
// </tbody>
