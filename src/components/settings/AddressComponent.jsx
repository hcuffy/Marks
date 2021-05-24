import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {AddressForm} from './formHelpers';
import css from './style.css';

function AddressComponent({t}) {
    return (
        <div className={css.address_wrapper}>
            <h4 className={css.address_header}>{t('settings.addressTitle')}</h4>
            <AddressForm/>

        </div>
    );
}

const mapStateToProps = state => ({addressData: state.addressData});

export default connect(mapStateToProps, null)(withTranslation()(AddressComponent));
