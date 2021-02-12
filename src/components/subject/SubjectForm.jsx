import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {Button, Intent, HTMLSelect, Label} from '@blueprintjs/core';

import {actionCreators} from '../../actions/index';
import {SubjectFormInputs} from './formHelpers';
import css from './style.css';

function SubjectForm({t, classListData, classes, actions}) {
    const selectOption = _.values(classes).map((data, idx) => (
        <option key={idx}>
            {data.name}
        </option>
    ));

    return (
        <div>
            <form onSubmit={actions.addNewSubject} method='POST'>

                <SubjectFormInputs t={t} classListData={classListData}/>

                <div className={css.form_div}>
                    <Label className={'bp3-inline'} htmlFor='cSelect'>{t('general.selectClass')}
                        <HTMLSelect type='text' name='room' id={'cSelect'}>
                            {selectOption}
                        </HTMLSelect>
                    </Label>
                </div>
                <div className={css.subject_save}>
                    <Button type='submit' intent={Intent.SUCCESS} text={t('general.add')} />

                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(withTranslation()(SubjectForm));
