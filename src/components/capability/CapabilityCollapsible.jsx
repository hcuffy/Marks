import React from 'react';
import _ from 'lodash';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {Button, Collapse, Intent, Alignment} from '@blueprintjs/core';

import CreateCards from './CapabilityCards';
import {openCard} from './actions';
import {capabilityQuestions} from './constants';
import css from './style.css';

function CapabilityCollapsible({t, capabilityData, openCard}) {
    const {showCard, cardId, questionBase} = capabilityData;
    const questions = _.find(capabilityQuestions, {name: questionBase}) || {};
    const questionKeys = _.keys(questions[questionBase]);

    const collapsibleElement = _.map(questionKeys, (data, idx) => {
        const translationBase = `capability.${questionBase}.${questions[questionBase][data]?.short}`;
        const subject = t(`${translationBase}.subject`);

        return (
            <div key={idx}>
                <Button
                    className={css.card_button}
                    large={true}
                    alignText={Alignment.LEFT}
                    onClick={openCard}
                    text={subject}
                    intent={Intent.PRIMARY}
                    card-id={data}
                />
                <Collapse isOpen={showCard && cardId === data } keepChildrenMounted={true}>
                    <CreateCards
                        data={data}
                        questions={questions}
                        questionBase={questionBase}
                        translationBase={translationBase}
                    />
                </Collapse>
            </div>

        );
    });

    return (

        <div className={css.cards_main_div} >
            <h4 className={css.card_header}>{t('capability.tableHeader')}</h4>
            <div>
                {collapsibleElement}
            </div>
        </div>

    );
}

const mapStateToProps = state => ({
    capabilityData: state.capabilityData
});

const mapDispatchToProps = {openCard};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CapabilityCollapsible));
