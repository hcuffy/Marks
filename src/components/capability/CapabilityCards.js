import React from 'react';
import _ from 'lodash';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {RadioGroup, Radio, Card} from '@blueprintjs/core';

import {handleCapabilityAnswers} from './actions';
import {capabilityQuestions} from './constants';
import css from './style.css';

function hasNoAnswers(selectAnswer, questionId) {
    return _.isUndefined(selectAnswer) || _.isEmpty(selectAnswer) || _.isUndefined(selectAnswer?.capability[questionId]);
}

function determineSelectedValue(capabilityData, questionId) {
    const {classroomId, studentId, cardId, answers} = capabilityData;
    const selectAnswer = _.find(answers, {classroomId, studentId, cardId}) || {};

    return hasNoAnswers(selectAnswer, questionId) ? 'option2' : selectAnswer?.capability[questionId];
}

function CreateRadioButton({t, questionId, capabilityData, handleCapabilityAnswers}) {
    const {studentId, classroomId, cardId} = capabilityData;
    const radioButtons = [];
    for (let i = 0; i < 6; i += 1) {
        radioButtons.push(<Radio
            key={i}
            label={t(`capability.options.option${i}`)}
            value={t(`option${i}`)}
            data-id={questionId}
            student-id={studentId}
            classroom-id={classroomId}
            card-id={cardId}
        />);
    }

    return (<div>
        <RadioGroup
            inline={true}
            onChange={handleCapabilityAnswers}
            selectedValue={determineSelectedValue(capabilityData, questionId)}
        >
            {radioButtons}
        </RadioGroup>
    </div>);
}

function CreateCards({t, data, translationBase, capabilityData, handleCapabilityAnswers}) {
    const {questionBase} = capabilityData;
    const questions = _.find(capabilityQuestions, {name: questionBase}) || {};
    const {number} = questions[questionBase][data];
    let subjectQuestion = [];

    for (let i = 0; i < number; i += 1) {
        subjectQuestion.push(
            <h6 key={i} > {t(`${translationBase}.question${[i]}`)} </h6>,
            <CreateRadioButton
                t={t}
                key={`radio${i}`}
                handleCapabilityAnswers={handleCapabilityAnswers}
                capabilityData={capabilityData}
                questionId={`question${[i]}`}

            />
        );
    }

    return (<div className={css.card_div}>
        <Card>
            {subjectQuestion}
        </Card>

    </div>);
}

const mapStateToProps = state => ({
    capabilityData: state.capabilityData
});

const mapDispatchToProps = {handleCapabilityAnswers};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CreateCards));
