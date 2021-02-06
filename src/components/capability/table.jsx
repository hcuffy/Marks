import React from 'react';
import _ from 'lodash';
import {Button, FormGroup, Input, Label} from 'reactstrap';

import {capabilityQuestions} from './constants';
import css from './styles/capability.css';

export function getQuestionSet(classroomId, questions) {
    if (_.isNull(classroomId) || _.isEmpty(questions)) {
        return null;
    }

    const questionData = _.find(questions, {classroomId}) || {};

    if (_.isUndefined(questionData)) {
        return null;
    }

    return questionData.questionSet;
}

//TODO: remove this function once all dropdown have been replaced
export function changeQuestionBtn(classroomId, {handleQuestionList}) {
    return (
        <Button
            className={css.change_Btn}
            color='danger'
            data-check='openButton'
            data-id={classroomId}
            onClick={handleQuestionList}
        >
		&#8617;
        </Button>
    );
}

function createKeys(numberOfKeys, prefix) {
    const keys = [];

    for (let i = 0; i < numberOfKeys; i += 1) {
        keys.push(`${prefix}${i}`);
    }

    return keys;
}

export function getQuestionBase(classroomId, questions) {
    const questionRoot = _.find(questions, {classroomId}) || {};

    return questionRoot ? questionRoot.questionSet : null;
}

function isOptionChecked(capabilityOption, {classroomId, questionId, studentId, answers}) {
    const answersToQuestion = _.find(answers, {classroomId, studentId}) || {};

    if (!_.isUndefined(answersToQuestion) && !_.isEmpty(answersToQuestion)) {
        const selectedQuestionOption = _.find(answersToQuestion.capability, {
            questionId,
            optionTag: capabilityOption
        }) || {};

        return !!selectedQuestionOption;
    }

    return false;
}

function questionOptions(t, data, actions) {
    const {subjectShort, questionKey, questionId, studentId, classroomId, optionsKeys} = data;

    const options = _.map(optionsKeys, (capabilityOption, idx) => (
        <td key={idx} className={css.radio_td}>
            <FormGroup>
                <Label className={css.radio_label}>
                    {t(`capability.options.${capabilityOption}`)}
                </Label>

                <Input
                    type='radio'
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
    ));

    return <tr>{options}</tr>;
}

export function createInnerBody(t, questionKeys, subjectHeader, translationStem, subjectShort, studentId, classroomId, answers, actions) {
    return _.map(questionKeys, (questionKey, idx) => {
        const questionId = `${subjectShort}${_.upperFirst(questionKey)}`;
        const optionsKeys = createKeys(6, 'option');
        const answerOptions = questionOptions(t, {subjectShort, questionKey, questionId, classroomId, optionsKeys, answers}, actions);
        const showHeader = _.last(questionKey) === '0' ? subjectHeader : null;

        return (
            <tbody key={idx}>
                {showHeader}
                <tr>
                    <th colSpan='6'>{t(`${translationStem}.${questionKey}`)}</th>
                </tr>
                {answerOptions}
            </tbody>
        );
    });
}

function createTableBody(t, subjects, actualSet, studentId, classroomId, answers, actions) {
    return _.map(subjects, subject => {
        const subjectKey = subject[_.findKey(subject)];
        const subjectShort = subjectKey.short;
        const questionKeys = createKeys(subjectKey.number, 'question');
        const translationStem = `capability.${actualSet}.${subjectShort}`;

        const subjectHeader = (
            <tr>
                <th colSpan='6'>{t(`${translationStem}.subject`)}</th>
            </tr>
        );

        return createInnerBody(t, questionKeys, subjectHeader, translationStem, subjectShort, studentId, classroomId, answers, actions);
    });
}

export function tableQuestions(t, actualSet, {studentId, classroomId, questions, answers}, actions) {
    const questionBase = getQuestionBase(classroomId, questions);
    const questionSet = _.find(capabilityQuestions, actualSet)[questionBase] || {};
    const questionArr = [];

    _.forIn(questionSet, (value, key) => {
        questionArr.push({[key]: value});
    });

    return createTableBody(t, questionArr, questionBase, studentId, classroomId, answers, actions);
}
