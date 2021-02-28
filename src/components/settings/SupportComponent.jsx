import React from 'react';
import {withTranslation} from 'react-i18next';
import {AnchorButton, Tag, Intent} from '@blueprintjs/core';

import {openResource} from '../../utils';
import {BMC_Link} from './constants';
import css from './style.css';

//TODO: Don't forget to add the real BMC_Link once it is created
function SupportComponent({t}) {
    return (
        <div className={css.support_div}>
            <div>
                <AnchorButton
                    icon='bank-account'
                    rightIcon='share'
                    text={t('settings.bmc')}
                    intent={Intent.SUCCESS}
                    data-name={BMC_Link}
                    onClick={openResource}
                />
            </div>

            <div className={css.contact_btn}>
                <Tag icon={'envelope'} large={true} minimal={true}>
                    {`${t('settings.contact')} marksapphelp@gmail.com`}
                </Tag>
            </div>
        </div>
    );
}

export default withTranslation()(SupportComponent);
