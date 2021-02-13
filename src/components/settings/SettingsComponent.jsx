import React from 'react';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Intent} from '@blueprintjs/core';

import AddressComponent from './AddressComponent';
import GradeSettingComponent from './GradeSettingComponent';
import ResetDialog from './ClearDatabaseComponet';
import {actionCreators} from '../../actions';
import css from './style.css';

function SettingsComponent({t, actions}) {
    return (
        <div className={css.settings_wrapper}>
            <h4 className={css.main_header}>{t('settings.sectionTitle')}</h4>

            <div className={css.address_div}>
                <AddressComponent t={t} />
            </div>

            <div className={css.gradeFormat_div}>
                <GradeSettingComponent t={t} />
            </div>
            <div className={css.reset_button}>
                <Button
                    text={t('settings.resetButton')}
                    icon='reset'
                    large={true}
                    intent={Intent.DANGER}
                    onClick={actions.showResetDialog}
                />
            </div>
            <div>
                <ResetDialog/>
            </div>
            <div />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(withTranslation()(SettingsComponent));
