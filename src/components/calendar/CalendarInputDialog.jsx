import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withTranslation} from 'react-i18next';
import {Button, Classes, Dialog, Intent} from '@blueprintjs/core';

import {DateTimeSelector, TitleInput} from './calendarHelpers';
import {actionCreators} from '../../actions';
import css from './style.css';

function InputDialog({t, calendarData, actions}) {
    const {isInvalid, showDialog, eventText, eventStart, eventEnd} = calendarData;
    const inputIntent = isInvalid ? Intent.DANGER : Intent.NONE;

    return (
        <div className={css.dialog_div}>
            < Dialog isOpen={showDialog} onClose={actions.closeEventDialog} title={t('calendar.eventDialog')}>
                <div className={Classes.DIALOG_BODY}>
                    <form onSubmit={actions.addNewEvent} method='POST'>
                        <TitleInput t={t} eventText={eventText} intent={inputIntent} label={'titleLabel'}/>
                        <DateTimeSelector t={t} date={eventStart} intent={inputIntent} label={'start'} />
                        <DateTimeSelector t={t} date={eventEnd} intent={inputIntent} label={'end'} />
                        <div className={Classes.DIALOG_FOOTER}>
                            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                                <Button type='submit' intent={Intent.SUCCESS} text={t('general.add')} formNoValidate />
                            </div>
                        </div>
                    </form>
                </div>
            </ Dialog>
        </div>
    );
}

const mapStateToProps = state => ({calendarData: state.calendarData});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(InputDialog));
