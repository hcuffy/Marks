import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {Button, Intent} from '@blueprintjs/core';

import {actionCreators} from '../../actions/index';
import {SubjectFormInputs} from './formHelpers';
import {Label} from 'reactstrap';
import css from './styles/subject.css';

function SubjectForm({t, classListData, subjects, actions}) {
    const selectOption = _.values(subjects).map((data, idx) => (
        <option className='form-control dropup' key={idx}>
            {data.name}
        </option>
    ));

    return (
        <div>
            <form onSubmit={actions.addNewSubject} method='POST'>

                <SubjectFormInputs t={t} classListData={classListData}/>

                <div className={css.form_div}>
                    <Label className={css.form_label} htmlFor='cSelect'>
                        {t('general.selectClass')}:
                    </Label>
                    <select type='text' name='room' className='form-control'>
                        {selectOption}
                    </select>
                </div>
                <div className={css.subject_save}>
                    <Button type='submit' intent={Intent.SUCCESS} formNoValidate text={t('general.add')} />

                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(withTranslation()(SubjectForm));
