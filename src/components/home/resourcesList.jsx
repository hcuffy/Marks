import React from 'react';
import _ from 'lodash';
import {ButtonGroup, AnchorButton, Intent} from '@blueprintjs/core';

import {GERMAN_LINKS, ENGLISH_LINKS} from './constants';
import {getUserLocale} from '../../utils';

export function resourceList(openResource) {
    const primaryLang = _.isUndefined(getUserLocale()) ? 'de' : getUserLocale();
    const LanguageLinks = primaryLang === 'de' ? GERMAN_LINKS : ENGLISH_LINKS;

    const list = _.keys(LanguageLinks).map((data, idx) => (

        <AnchorButton key={idx}
            data-name={LanguageLinks[data]}
            text={data}
            onClick={openResource}
            intent={Intent.PRIMARY}
        />

    ));

    return (<ButtonGroup
        vertical={true}
        fill={true}
        large={true}
        alignText={'left'}
    >
        {list}
    </ButtonGroup>);
}
