import React from 'react'
import { FormGroup, Button, Input, Label } from 'reactstrap'
import styles from '../styles/capability.css'

const _ = require('lodash')

export const getQuestionSet = (classroomId, answers) => {
	if (_.isNull(classroomId) || _.isEmpty(answers)) {
		return null
	}

	const questionData = _.find(answers, { classroomId })
	if (_.isUndefined(questionData)) {
		return null
	}

	return questionData.questionSet
}

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

const createKeys = (numberOfKeys, prefix) => {
	const keys = []
	for (let i = 0; i < numberOfKeys; i += 1) {
		keys.push(`${prefix}${i}`)
	}

	return keys
}

export const getQuestionBase = (classroomId, answers) => {
	const questionRoot = _.find(answers, { classroomId })

	return questionRoot ? questionRoot.questionSet : null
}

const questionOptions = (t, data, actions) => {
	const {
		subjectShort,
		optionKey,
		questionId,
		studentId,
		classroomId,
		optionsKeys
	} = data

	const options = optionsKeys.map((capabilityOption, idx) => (
		<td key={idx} className={styles.radio_td}>
			<FormGroup>
				<Label className={styles.radio_label}>
					{t(`capability.options.${capabilityOption}`)}
				</Label>
				<Input
					type="radio"
					className={styles.radio_input}
					data-id={questionId}
					option-tag={capabilityOption}
					student-id={studentId}
					classroom-id={classroomId}
					onClick={actions.handleCapabilityAnswers}
					name={`${subjectShort}${_.last(optionKey)}`}
				/>
			</FormGroup>
		</td>
	))

	return <tr>{options}</tr>
}

export const createInnerBody = (
	t,
	questionKeys,
	subjectHeader,
	translationStem,
	subjectShort,
	studentId,
	classroomId,
	actions
) => {
	const question = questionKeys.map((questionKey, idx) => {
		const questionId = `${subjectShort}${_.upperFirst(questionKey)}`
		const optionsKeys = createKeys(6, 'option')
		const answerOptions = questionOptions(
			t,
			{ subjectShort, questionKey, questionId, studentId, classroomId, optionsKeys },
			actions
		)
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

export const createTableBody = (
	t,
	subjects,
	actualSet,
	studentId,
	classroomId,
	actions
) => {
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
			subjectShort,
			studentId,
			classroomId,
			actions
		)

		return innerTableBody
	})

	return questions
}
