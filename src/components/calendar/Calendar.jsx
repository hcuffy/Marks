import React from 'react';
import moment from 'moment';
import {Calendar, Views, momentLocalizer} from 'react-big-calendar';
import {withTranslation} from 'react-i18next';

//TODO remove this test data once saving and retrieval from the DB is complete

import testData from './example';

const localizer = momentLocalizer(moment);
const timeRangeFormat = ({start, end}, culture, local) => `${local.format(start, 'HH:mm', culture)
} - ${ local.format(end, 'HH:mm', culture)}`;

const formats = {
    dateFormat:            'L',
    timeGutterFormat:      'HH:mm',
    selectRangeFormat:     timeRangeFormat,
    eventTimeRangeFormat:  timeRangeFormat,
    agendaDateFormat:      'L',
    agendaTimeRangeFormat: timeRangeFormat
};

function CalendarElement() {
    return (
        <Calendar
            selectable
            localizer={localizer}
            formats={formats}
            events={testData}
            defaultView={Views.WEEK}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date(2015, 3, 12)}
            onSelectEvent={() => {}}
            onSelectSlot={() => {}}
        />

    );
}

export default withTranslation()(CalendarElement);
