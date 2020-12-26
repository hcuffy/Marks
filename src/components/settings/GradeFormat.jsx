import React from 'react';

import {GradeType} from './formHelpers';
import css from './styles/settings.css';

function GradeFormat({t}) {
    return (
        <div>
            <h4 className={css.center_header}>{t('settings.gradeSystemTitle')}</h4>

            <GradeType/>
        </div>
    );
}

export default GradeFormat;
