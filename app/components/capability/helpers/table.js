import React from 'react'
import { FormGroup, Button, Input, Label } from 'reactstrap'
import css from '../styles/capability.css'

const _ = require('lodash')

export const getQuestionSet = (classroomId, questions) => {
	if (_.isNull(classroomId) || _.isEmpty(questions)) {
		return null
	}

	const questionData = _.find(questions, { classroomId })
	if (_.isUndefined(questionData)) {
		return null
	}

	return questionData.questionSet
}

export const changeQuestionBtn = (classroomId, { openQuestionList }) => (
	<Button
		className={css.change_Btn}
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

export const getQuestionBase = (classroomId, questions) => {
	const questionRoot = _.find(questions, { classroomId })

	return questionRoot ? questionRoot.questionSet : null
}

const isOptionChecked = (capabilityOption, { classroomId, questionId, studentId, answers }) => {
	const answersToQuestion = _.find(answers, { classroomId, studentId })
	console.log(answersToQuestion)
	if (!_.isUndefined(answersToQuestion) && !_.isEmpty(answersToQuestion)) {
		const selectedQuestionOption = _.find(answersToQuestion.capability, { questionId, optionTag: capabilityOption })
		console.log(selectedQuestionOption)
		if (selectedQuestionOption) {
			return true
		}
	}
}

const questionOptions = (t, data, actions) => {
	const { subjectShort, questionKey, questionId, studentId, classroomId, optionsKeys } = data
	const options = optionsKeys.map((capabilityOption, idx) => (
		<td key={idx} className={css.radio_td}>
			<FormGroup>
				<Label className={css.radio_label}>{t(`capability.options.${capabilityOption}`)}</Label>
				<Input
					type="radio"
					className={css.radio_input}
					data-id={questionId}
					option-tag={capabilityOption}
					student-id={studentId}
					classroom-id={classroomId}
					onClick={actions.handleCapabilityAnswers}
					name={`${subjectShort}${_.last(questionKey)}`}
					defaultChecked={isOptionChecked(capabilityOption, data)}
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
	answers,
	actions
) => {
	const question = questionKeys.map((questionKey, idx) => {
		const questionId = `${subjectShort}${_.upperFirst(questionKey)}`
		const optionsKeys = createKeys(6, 'option')
		const answerOptions = questionOptions(
			t,
			{ subjectShort, questionKey, questionId, studentId, classroomId, optionsKeys, answers },
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

export const createTableBody = (t, subjects, actualSet, studentId, classroomId, answers, actions) => {
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
			answers,
			actions
		)

		return innerTableBody
	})

	return questions
}
