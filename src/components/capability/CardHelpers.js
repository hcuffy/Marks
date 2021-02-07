import React from 'react';
import _ from 'lodash';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {RadioGroup, Radio, Card} from '@blueprintjs/core';

import {actionCreators} from '../../actions/index';
import {capabilityQuestions} from './constants';
import css from './styles/capability.css';

function detemineSelectedValue() {

}

function CreateRadioButton({t, questionId, capabilityData, handleCapabilityAnswers}) {
    const {studentId, classroomId, cardId, answers} = capabilityData;
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
            selectedValue={'Soup'}
        >
            {radioButtons}
        </RadioGroup>
    </div>);
}

function CreateCards({t, data, translationBase, capabilityData, actions}) {
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
                handleCapabilityAnswers={actions.handleCapabilityAnswers}
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

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CreateCards));
