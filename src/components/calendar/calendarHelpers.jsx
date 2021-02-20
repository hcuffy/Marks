import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import {Button, Classes, FormGroup, InputGroup, Intent, Label} from '@blueprintjs/core';

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
export function mapEventsData({events}) {
    return _.map(events, data => (
        {
            id:    data._id,
            title: data.title,
            start: new Date(data.startDate),
            end:   new Date(data.endDate)
        }
    ));
}

export function TitleInput({t, title, eventId, intent, label}) {
    return (
        <div>  <FormGroup inline={false} labelFor={'titleId'} label={t(`calendar.${label}`)}>
            <InputGroup
                id={'titleId'}
                eventid={eventId}
                name={'title'}
                type='text'
                intent={intent}
                defaultValue={title}
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
                    step={'1800'}
                    defaultValue={defaultValue}
                />
            </Label>
        </div>
    );
}

export function FooterButtons({t, eventId, deleteAction}) {
    const saveButtonLabel = _.isNull(eventId) ? t('general.add') : t('general.update');

    return (
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            {eventId && <Button
                type='button'
                intent={Intent.DANGER}
                text={t('general.delete')}
                onClick={deleteAction}
                data-id={eventId}
            />}
            <Button type='submit' intent={Intent.SUCCESS} text={saveButtonLabel} formNoValidate />
        </div>
    );
}

