import React from 'react';

import {GradeSelector} from './formHelpers';

function GradeSettingComponent({t}) {
    return (
        <div>
            <h4>{t('settings.gradeSystemTitle')}</h4>

            <GradeSelector/>
        </div>
    );
}

export default GradeSettingComponent;
