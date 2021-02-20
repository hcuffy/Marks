import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withTranslation} from 'react-i18next';
import {Calendar, Views, momentLocalizer} from 'react-big-calendar';

import {formats, getMessages, mapEventsData} from './calendarHelpers';
import {actionCreators} from '../../actions';

function CalendarElement({t, calendarData, actions}) {
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
            onSelectEvent={actions.handleEventDialog}
            onSelectSlot={actions.handleEventDialog}
        />

    );
}

const mapStateToProps = state => ({
    calendarData: state.calendarData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CalendarElement));
