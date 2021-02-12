import React from 'react';
import {withTranslation} from 'react-i18next';

import AddressComponent from './AddressComponent';
import GradeSettingComponent from './GradeSettingComponent';
import css from './style.css';

function Settings({t}) {
    return (
        <div className={css.settings_wrapper}>
            <h4 className={css.main_header}>{t('settings.sectionTitle')}</h4>

            <div className={css.address_div}>
                <AddressComponent t={t} />
            </div>

            <div className={css.gradeFormat_div}>
                <GradeSettingComponent t={t} />
            </div>

            <div />
        </div>
    );
}

export default withTranslation()(Settings);
