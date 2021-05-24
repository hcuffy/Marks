import React from 'react';
import {withTranslation} from 'react-i18next';

import AddressComponent from './AddressComponent';
import GradeSettingComponent from './GradeSettingComponent';
import ResetButtonsComponent from './ResetComponent';
import SupportComponent from './SupportComponent';
import ResetDialog from './ClearDatabaseDialog';
import css from './style.css';

function SettingsComponent({t}) {
    return (
        <div className={css.settings_wrapper}>
            <h4 className={css.main_header}>{t('settings.sectionTitle')}</h4>

            <div className={css.address_div}>
                <AddressComponent/>
            </div>

            <div className={css.gradeFormat_div}>
                <GradeSettingComponent t={t} />
            </div>

            <div className={css.reset_button}>
                <ResetButtonsComponent t={t}/>
            </div>

            <div>
                <ResetDialog/>
            </div>
            <div>
                <SupportComponent />
            </div>
        </div>
    );
}

export default withTranslation()(SettingsComponent);
