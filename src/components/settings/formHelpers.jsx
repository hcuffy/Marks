import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withTranslation} from 'react-i18next';
import {Button, Intent, Radio, RadioGroup, FormGroup} from '@blueprintjs/core';

import {filteredAddressData} from '../helpers/formValidation';
import {actionCreators} from '../../actions';
import css from './styles/settings.css';

export function AddressFields({t, addressData}) {
    const address = filteredAddressData(addressData);

    return _.keys(address).map((data, idx) => (
        <div key={idx} className={css.form_inner_div}>
            <label htmlFor={`school${data}`} className='bp3-label'>
                {t(`settings.${data}`)}:
                <input
                    name={data}
                    className='bp3-input bp3-fill'
                    id={`school${data}`}
                    type='text'
                    defaultValue={address[data]}
                    placeholder= {t(`settings.${data}`)}
                />
            </label>
        </div>
    ));
}

function AddressFormComponent({t, addressData, actions}) {
    return (
        <form onSubmit={actions.saveSchoolAddress} method='POST'>
            <div className={css.form_outer_div}>
                <FormGroup inline={true}>
                    <AddressFields t={t} addressData={addressData}/>
                </FormGroup>
                <div className={(css.form_inner_div, css.save_btn)}>
                    <Button type='submit' intent={Intent.SUCCESS} text={t('general.save')} />
                </div>
            </div>
        </form>
    );
}

export const AddressForm = connect(
    state => ({
        addressData: state.addressData
    }),
    dispatch => ({
        actions: bindActionCreators(actionCreators, dispatch)
    })
)(withTranslation()(AddressFormComponent));

export function gradingSystem(settings) {
    return _.findKey(settings, gradeType => gradeType === true);
}

function RadioButtonsComponent({t, addressData, actions}) {
    const selectedValue = gradingSystem(_.pick(addressData, ['note', 'points', 'percent']));

    return (<RadioGroup
        inline={false}
        name='settings'
        selectedValue={selectedValue}
        onChange={actions.updateGradingSystem}
    >
        <Radio label={t('settings.note')} value='note' />
        <Radio label={t('settings.points')} value='points' />
        <Radio label={t('settings.percent')} value='percent' />
    </RadioGroup>);
}

export const GradeType = connect(
    state => ({
        addressData: state.addressData
    }),
    dispatch => ({
        actions: bindActionCreators(actionCreators, dispatch)
    })
)(withTranslation()(RadioButtonsComponent));
