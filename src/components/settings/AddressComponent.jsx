import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withTranslation} from 'react-i18next';

import {actionCreators} from '../../actions';
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

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddressComponent));
