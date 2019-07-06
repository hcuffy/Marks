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
