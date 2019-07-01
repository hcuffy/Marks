const _ = require('lodash')

const test = [{ classroomId: 'tYT51Q9aLY41Qo0', question: 'test' }]
export const getQuestionSet = (classroomId, answers) => {
	if (_.isNull(classroomId) || _.isEmpty(answers)) {
		return null
	}

	const questionData = _.find(answers, { classroomId })
	if (_.isUndefined(questionEntry)) {
		return null
	}

	return questionData.question
}
