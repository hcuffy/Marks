import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {Button, Intent} from '@blueprintjs/core';

import {showResetDialog} from './actions';
import {dangerAction} from './constants';
import css from './style.css';

function ResetComponent({t, showResetDialog}) {
    return (
        <div>
            <Button
                text={t('settings.resetCalendar')}
                icon='trash'
                intent={Intent.WARNING}
                onClick={showResetDialog}
                data-id={dangerAction.calendar}
            />
            <Button
                text={t('settings.resetDatabase')}
                icon='trash'
                intent={Intent.DANGER}
                onClick={showResetDialog}
                data-id={dangerAction.db}
                className={css.reset_db}
            />
        </div>
    );
}

const mapDispatchToProps = {showResetDialog};

export default connect(null, mapDispatchToProps)(withTranslation()(ResetComponent));
