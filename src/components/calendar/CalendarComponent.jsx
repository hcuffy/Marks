import React from 'react';
import {withTranslation} from 'react-i18next';

import CalendarElement from './Calendar';
import css from './style.css';

function CalendarComponent({t}) {
    return (
        <div className={css.section_wrapper}>
            <h4 className={css.main_header}>{t('calendar.sectionTitle')}</h4>

            <div className={css.calendar_wrapper}>
                <CalendarElement t={t}/>
            </div>
        </div>
    );
}

export default withTranslation()(CalendarComponent);
