import React from 'react';
import _ from 'lodash';
import {Button} from 'reactstrap';
import css from '../styles/settings.css';

export const addressForm = (t, entry, actions) => (
    <form onSubmit={actions.saveSchoolAddress} method='POST'>
        <div className={css.form_outer_div}>
            {entry}

            <div className={(css.form_inner_div, css.save_btn)}>
                <Button type='submit' className='btn btn-success'>
                    {t('general.save')}
                </Button>
            </div>
        </div>
    </form>
);

export const addressFields = (t, addressData) => _.keys(addressData).map((data, idx) => (
    <div key={idx} className={css.form_inner_div}>
        <label className={css.form_label} htmlFor={`school${data}`}>
            {t(`settings.${data}`)}:
        </label>

        <input
            name={data}
            className='form-control'
            id={`school${data}`}
            type='text'
            defaultValue={addressData[data]}
        />
    </div>
));

export const gradeRadioButtons = (t, systemType, actions) => _.keys(systemType).map((data, idx) => (
    <div key={idx} className={`form-check ${css.radio_div}`}>
        <label htmlFor={data} className={`form-check-label ${css.radio_label}`}>
            {t(`settings.${data}`)}
        </label>

        <input
            id={data}
            type='radio'
            className={`form-control ${css.radio_input}`}
            name='grading'
            onClick={actions.updateSystemType}
            defaultValue={data}
            defaultChecked={systemType[data]}
        />
    </div>
));
