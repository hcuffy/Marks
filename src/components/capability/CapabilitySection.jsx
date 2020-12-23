import React from 'react';
import {withTranslation} from 'react-i18next';

import CapabilityDropdown from './CapabilityDropdown';
import CapabilityTable from './CapabilityTable';
import css from './styles/capability.css';

function CapabilitySection({t}) {
    return (
        <div className={css.capability_wrapper}>
            <h4 className={css.main_header}>{t('capability.sectionTitle')}</h4>
            <CapabilityDropdown t={t} />
            <CapabilityTable t={t} />
        </div>
    );
}

export default withTranslation()(CapabilitySection);
