import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {Button, Intent} from '@blueprintjs/core';

import {actionCreators} from '../../actions';
import css from './style.css';

function ResetComponent({t, actions}) {
    return (
        <div>
            <Button
                text={t('settings.resetCalendar')}
                icon='trash'
                intent={Intent.WARNING}
                onClick={actions.showResetDialog}
                data-id={'calendar'}
            />
            <Button
                text={t('settings.resetDatabase')}
                icon='trash'
                intent={Intent.DANGER}
                onClick={actions.showResetDialog}
                data-id={'db'}
                className={css.reset_db}
            />

        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(withTranslation()(ResetComponent));
