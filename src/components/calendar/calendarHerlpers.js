
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
