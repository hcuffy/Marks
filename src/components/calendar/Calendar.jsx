import React from 'react';
import moment from 'moment';
import {Calendar, Views, momentLocalizer} from 'react-big-calendar';
import {withTranslation} from 'react-i18next';

import {formats, getMessages} from './calendarHerlpers';
//TODO remove this test data once saving and retrieval from the DB is complete
import testData from './example';

function CalendarElement({t}) {
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
            onSelectSlot={() => {}}
        />

    );
}

export default withTranslation()(CalendarElement);
