import React from 'react';
import {withTranslation} from 'react-i18next';

import css from './style.css';
import GraphDropdown from './GraphDropdown';
import Chart from './Chart';

function GraphOverview({t}) {
    return (
        <div>
            <h4 className={css.center_header}>{t('graph.overview')}</h4>

            <GraphDropdown t={t} />

            <div className={css.chart_div}>
                <Chart t={t} />
            </div>
        </div>
    );
}

export default withTranslation()(GraphOverview);
