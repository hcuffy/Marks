import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {Calendar, Views, momentLocalizer} from 'react-big-calendar';

import {formats, getMessages, mapEventsData} from './calendarHelpers';
import {handleEventDialog} from './actions';

function CalendarElement({t, calendarData, handleEventDialog}) {
    const messages = getMessages(t);
    const eventsData = mapEventsData(calendarData);

    return (
        <Calendar
            selectable
            localizer={momentLocalizer(moment)}
            formats={formats}
            messages={messages}
            popup
            events={eventsData}
            defaultView={Views.WEEK}
            onSelectEvent={handleEventDialog}
            onSelectSlot={handleEventDialog}
        />

    );
}

const mapStateToProps = state => ({
    calendarData: state.calendarData
});

const mapDispatchToProps = {handleEventDialog};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CalendarElement));
