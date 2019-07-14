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

const questionOptions = (t, subjectShort, optionKey) => {
	const optionsKeys = createKeys(6, 'option')

	const options = optionsKeys.map((capabilityOptions, idx) => (
		<td key={idx} className={styles.radio_td}>
			<FormGroup>
				<Label className={styles.radio_label}>
					{t(`capability.options.${capabilityOptions}`)}
				</Label>
				<Input
					type="radio"
					className={styles.radio_input}
					name={`${subjectShort}${_.last(optionKey)}`}
				/>
			</FormGroup>
		</td>
	))

	return <tr>{options}</tr>
}

const createInnerBody = (
	t,
	questionKeys,
	subjectHeader,
	translationStem,
	subjectShort
) => {
	const question = questionKeys.map((questionKey, idx) => {
		const answerOptions = questionOptions(t, subjectShort, questionKey)

		const showHeader = _.last(questionKey) === '0' ? subjectHeader : null

		return (
			<tbody key={idx}>
				{showHeader}
				<tr>
					<th colSpan="6">{t(`${translationStem}.${questionKey}`)}</th>
				</tr>
				{answerOptions}
			</tbody>
		)
	})

	return question
}

const createTableBody = (t, subjects, actualSet) => {
	const questions = subjects.map(subject => {
		const subjectKey = subject[_.findKey(subject)]
		const subjectShort = subjectKey.short
		const questionKeys = createKeys(subjectKey.number, 'question')
		const translationStem = `capability.${actualSet}.${subjectShort}`
		const subjectHeader = (
			<tr>
				<th colSpan="6">{t(`${translationStem}.subject`)}</th>
			</tr>
		)
		const innerTableBody = createInnerBody(
			t,
			questionKeys,
			subjectHeader,
			translationStem,
			subjectShort
		)

		return innerTableBody
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

	return createTableBody(t, questionArr, developerHolder)
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
