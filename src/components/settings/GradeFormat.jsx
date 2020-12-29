import React from 'react';

import {GradeType} from './formHelpers';

function GradeFormat({t}) {
    return (
        <div>
            <h4>{t('settings.gradeSystemTitle')}</h4>

            <GradeType/>
        </div>
    );
}

export default GradeFormat;
