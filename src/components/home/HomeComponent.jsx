import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {resourceList} from './resourcesList';
import {filteredAddressData} from '../helpers';
import {openResource} from '../../utils';
import css from './style.css';

function HomeComponent({t, addressData}) {
    const entry = _.values(filteredAddressData(addressData)).map((data, idx) => <li key={idx}>{data}</li>);

    return (
        <div>
            <h4 className={css.main_header}> {t('home.title')}</h4>
            <div className={css.school_left_div}>
                <div>
                    <p>{t('home.addressHeader')}</p>

                    <span>{entry}</span>
                </div>
            </div>

            <div className={css.school_right_div}>
                <div>
                    <p>{t('home.resourcesHeader')}</p>

                    {resourceList(openResource)}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    addressData: state.addressData
});

export default connect(mapStateToProps, null)(withTranslation()(HomeComponent));
