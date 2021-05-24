import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {Classes, Dialog, Intent} from '@blueprintjs/core';

import {DateTimeSelector, TitleInput, FooterButtons, WeekInput} from './calendarHelpers';
import {closeEventDialog, handleEventCreation, deleteSingleEvent} from './actions';
import css from './style.css';

function InputDialog({t, calendarData, closeEventDialog, handleEventCreation, deleteSingleEvent}) {
    const {isInvalid, showDialog, title, startDate, endDate, eventId} = calendarData;
    const inputIntent = isInvalid ? Intent.DANGER : Intent.NONE;
    const dialogLabel = _.isNull(eventId) ? t('calendar.addDialog') : t('calendar.editDialog');

    return (
        <div className={css.dialog_div}>
            < Dialog isOpen={showDialog} onClose={closeEventDialog} title={dialogLabel}>
                <div className={Classes.DIALOG_BODY}>
                    <form onSubmit={handleEventCreation} method='POST'>
                        <TitleInput t={t} title={title} eventId={eventId} intent={inputIntent} label={'titleLabel'}/>
                        <DateTimeSelector t={t} date={startDate} intent={inputIntent} label={'start'}/>
                        <DateTimeSelector t={t} date={endDate} intent={inputIntent} label={'end'}/>
                        {_.isNull(eventId) && <WeekInput t={t} intent={inputIntent}/>}
                        <div className={Classes.DIALOG_FOOTER}>
                            <FooterButtons t={t} eventId={eventId} deleteAction={deleteSingleEvent}/>
                        </div>

                    </form>
                </div>
            </ Dialog>
        </div>
    );
}

const mapStateToProps = state => ({calendarData: state.calendarData});

const mapDispatchToProps = {closeEventDialog, handleEventCreation, deleteSingleEvent};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(InputDialog));
