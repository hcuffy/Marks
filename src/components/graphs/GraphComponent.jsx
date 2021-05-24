import React from 'react';
import {withTranslation} from 'react-i18next';

import css from './style.css';
import GraphDropdown from './GraphDropdown';
import Chart from './Chart';

function GraphComponent({t}) {
    return (
        <div>
            <h4 className={css.center_header}>{t('graph.overview')}</h4>

            <GraphDropdown t={t} />

            <div className={css.chart_div}>
                <Chart/>
            </div>
        </div>
    );
}

export default withTranslation()(GraphComponent);
