import React from 'react';
import {withTranslation} from 'react-i18next';
import {Button, Tag, Intent} from '@blueprintjs/core';

import bmc from './images/bmc.svg';
import {openResource} from '../../utils';
import {BMC_Link} from './constants';
import css from './style.css';

function SupportComponent({t}) {
    return (
        <div className={css.support_div}>
            <div>
                <Button
                    rightIcon='share'
                    intent={Intent.SUCCESS}
                    data-name={BMC_Link}
                    onClick={openResource}
                >
                    <img src={bmc} alt='Buy Me a Coffee' />
                    {t('settings.bmc')}
                </Button>
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
