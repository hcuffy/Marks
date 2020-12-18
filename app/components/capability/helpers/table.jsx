import React from 'react';
import _ from 'lodash';
import {Button, FormGroup, Input, Label} from 'reactstrap';
import {capabilityQuestions} from '../constants';
import css from '../styles/capability.css';

export const getQuestionSet = (classroomId, questions) => {
    if (_.isNull(classroomId) || _.isEmpty(questions)) {
        return null;
    }

    const questionData = _.find(questions, {classroomId});

    if (_.isUndefined(questionData)) {
        return null;
    }

    return questionData.questionSet;
};

export const changeQuestionBtn = (classroomId, {openQuestionList}) => (
    <Button
        className={css.change_Btn}
        color='danger'
        data-check='openButton'
        data-id={classroomId}
        onClick={openQuestionList}
    >
		&#8617;
    </Button>
);

const createKeys = (numberOfKeys, prefix) => {
    const keys = [];

    for (let i = 0; i < numberOfKeys; i += 1) {
        keys.push(`${prefix}${i}`);
    }

    return keys;
};

export const getQuestionBase = (classroomId, questions) => {
    const questionRoot = _.find(questions, {classroomId});

    return questionRoot ? questionRoot.questionSet : null;
};

const isOptionChecked = (
    capabilityOption,
    {classroomId, questionId, studentId, answers}
) => {
    const answersToQuestion = _.find(answers, {classroomId, studentId});

    if (!_.isUndefined(answersToQuestion) && !_.isEmpty(answersToQuestion)) {
        const selectedQuestionOption = _.find(answersToQuestion.capability, {
            questionId,
            optionTag: capabilityOption
        });

        return !!selectedQuestionOption;
    }

    return false;
};

const questionOptions = (t, data, actions) => {
    const {
        subjectShort,
        questionKey,
        questionId,
        studentId,
        classroomId,
        optionsKeys
    } = data;

    const options = optionsKeys.map((capabilityOption, idx) => (
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
};

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
    return questionKeys.map((questionKey, idx) => {
        const questionId = `${subjectShort}${_.upperFirst(questionKey)}`;
        const optionsKeys = createKeys(6, 'option');

        const answerOptions = questionOptions(
            t,
            {
                subjectShort,
                questionKey,
                questionId,
                studentId,
                classroomId,
                optionsKeys,
                answers
            },
            actions
        );

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
};

const createTableBody = (
    t,
    subjects,
    actualSet,
    studentId,
    classroomId,
    answers,
    actions
) => {
    return subjects.map(subject => {
        const subjectKey = subject[_.findKey(subject)];
        const subjectShort = subjectKey.short;
        const questionKeys = createKeys(subjectKey.number, 'question');
        const translationStem = `capability.${actualSet}.${subjectShort}`;

        const subjectHeader = (
            <tr>
                <th colSpan='6'>{t(`${translationStem}.subject`)}</th>
            </tr>
        );

        return createInnerBody(
            t,
            questionKeys,
            subjectHeader,
            translationStem,
            subjectShort,
            studentId,
            classroomId,
            answers,
            actions
        );
    });
};

export const tableQuestions = (
    t,
    actualSet,
    {studentId, classroomId, questions, answers},
    actions
) => {
    const questionBase = getQuestionBase(classroomId, questions);
    const questionSet = _.find(capabilityQuestions, actualSet)[questionBase];
    const questionArr = [];

    _.forIn(questionSet, (value, key) => {
        questionArr.push({[key]: value});
    });

    return createTableBody(
        t,
        questionArr,
        questionBase,
        studentId,
        classroomId,
        answers,
        actions
    );
};
