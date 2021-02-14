import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Calendar, Views, momentLocalizer} from 'react-big-calendar';
import {withTranslation} from 'react-i18next';

import {formats, getMessages} from './calendarHelpers';
import {actionCreators} from '../../actions';
//TODO remove this test data once saving and retrieval from the DB is complete
import testData from './example';

function CalendarElement({t, actions}) {
    const messages = getMessages(t);

    return (
        <Calendar
            selectable
            localizer={momentLocalizer(moment)}
            formats={formats}
            messages={messages}
            popup
            events={testData}
            defaultView={Views.WEEK}
            onSelectEvent={() => {}}
            onSelectSlot={actions.showAddEventDialog}
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
