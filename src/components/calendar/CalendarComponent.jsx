import React from 'react';
import moment from 'moment';
import {withTranslation} from 'react-i18next';

import CalendarElement from './Calendar';
import InputDialog from './CalendarInputDialog';
import {getUserLocale} from '../../utils';
import css from './style.css';

function CalendarComponent({t}) {
    moment.locale(getUserLocale());

    return (
        <div className={css.section_wrapper}>
            <h4 className={css.main_header}>{t('calendar.sectionTitle')}</h4>

            <div className={css.calendar_wrapper}>
                <CalendarElement/>
                <InputDialog/>
            </div>
        </div>
    );
}

export default withTranslation()(CalendarComponent);
