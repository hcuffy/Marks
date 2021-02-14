import React from 'react';
import moment from 'moment';

import {FormGroup, InputGroup, Label} from '@blueprintjs/core';

const timeRangeFormat = ({start, end}, culture, local) => `${local.format(start, 'HH:mm', culture)
} - ${ local.format(end, 'HH:mm', culture)}`;

export const formats = {
    dateFormat:            'L',
    timeGutterFormat:      'HH:mm',
    selectRangeFormat:     timeRangeFormat,
    eventTimeRangeFormat:  timeRangeFormat,
    agendaDateFormat:      'L',
    agendaTimeRangeFormat: timeRangeFormat
};

export function getMessages(t) {
    return {
        date:            t('calendar.date'),
        time:            t('calendar.time'),
        event:           t('calendar.event'),
        allDay:          t('calendar.allDay'),
        week:            t('calendar.week'),
        work_week:       t('calendar.workWeek'),
        day:             t('calendar.day'),
        month:           t('calendar.month'),
        previous:        t('calendar.previous'),
        next:            t('calendar.next'),
        yesterday:       t('calendar.yesterday'),
        tomorrow:        t('calendar.tomorrow'),
        today:           t('calendar.today'),
        agenda:          t('calendar.agenda'),
        noEventsInRange: t('calendar.noEventsInRange'),
        showMore:        function showMore(total) {
            return `+${total} ${t('calendar.more')}`;
        }
    };
}

export function TitleInput({t, eventText, intent, label}) {
    return (
        <div>  <FormGroup inline={false} labelFor={'calendar_Id'} label={t(`calendar.${label}`)}>
            <InputGroup
                id={'calendar_Id'}
                name={'addInput'}
                type='text'
                intent={intent}
                defaultValue={eventText}
            />
        </FormGroup></div>
    );
}

export function DateTimeSelector({t, date, intent, label}) {
    const defaultValue = moment(date).format('YYYY-MM-DDTHH:mm');

    return (
        <div>
            <Label htmlFor={`${label}Date`}> {t(`calendar.${label}`)}
                <InputGroup
                    name={`${label}Date`}
                    intent={intent}
                    type='datetime-local'
                    id={`${label}Date`}
                    min='2019-01-01T00:00'
                    defaultValue={defaultValue}
                />
            </Label>
        </div>
    );
}

