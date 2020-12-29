import React from 'react';
import _ from 'lodash';
import {ButtonGroup, AnchorButton, Intent} from '@blueprintjs/core';

import {GERMAN_LINKS, ENGLISH_LINKS} from './constants';
import {currentLanguage} from '../../utils';

export function resourceList(openResource) {
    const primaryLang = _.isUndefined(currentLanguage()) ? 'de' : currentLanguage().slice(0, 2);
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
