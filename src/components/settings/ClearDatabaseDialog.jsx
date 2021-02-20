import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withTranslation} from 'react-i18next';
import {Button, Classes, Dialog, FormGroup, InputGroup, Intent} from '@blueprintjs/core';

import {actionCreators} from '../../actions';

function getDialogLabels(t, resetId) {
    const headerText = resetId === 'db' ? t('settings.resetDialog') : t('settings.resetDialogCalendar');
    const buttonText = resetId === 'db' ? t('general.reset') : t('general.clear');

    return {headerText, buttonText};
}

function ResetDialog({t, settingData, actions}) {
    const {isInvalid, showDialog, confirmationText, resetId} = settingData;
    const inputIntent = isInvalid ? Intent.DANGER : Intent.NONE;
    const {headerText, buttonText} = getDialogLabels(t, resetId);

    return (
        <div>
            < Dialog isOpen={showDialog} onClose={actions.showResetDialog} title={headerText}>
                <div className={Classes.DIALOG_BODY}>
                    <form onSubmit={actions.resetDatabase} method='POST'>
                        <FormGroup inline={false} labelFor={'reset_Id'} label={t('settings.resetLabel')}>
                            <InputGroup
                                name={'resetInput'}
                                resetid={resetId}
                                type='text'
                                intent={inputIntent}
                                defaultValue={confirmationText}
                            />
                        </FormGroup>
                        <div className={Classes.DIALOG_FOOTER}>
                            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                                <Button type='submit' intent={Intent.DANGER} text={buttonText} formNoValidate />
                            </div>
                        </div>
                    </form>
                </div>
            </ Dialog>
        </div>
    );
}

const mapStateToProps = state => ({settingData: state.settingData});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ResetDialog));
