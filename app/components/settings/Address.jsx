import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {addressForm, addressFields} from './helpers/formHelpers';
import {addressElements} from '../helpers/formValidation';
import {actionCreators} from '../../actions/index';
import css from './styles/settings.css';

const Address = ({t, addressData, actions}) => {
    const entry = addressFields(t, addressElements(addressData));

    return (
        <div className={css.address_wrapper}>
            <h4 className={css.address_header}>{t('settings.addressTitle')}</h4>

            {addressForm(t, entry, actions)}
        </div>
    );
};
const mapStateToProps = state => ({addressData: state.addressData});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(Address));
