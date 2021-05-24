import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {Button, Intent, HTMLSelect, Label} from '@blueprintjs/core';

import {addNewSubject} from './actions';
import {SubjectFormInputs} from './formHelpers';
import css from './style.css';

function SubjectForm({t, classListData, classes, addNewSubject}) {
    const selectOption = _.values(classes).map((data, idx) => (
        <option key={idx}>
            {data.name}
        </option>
    ));

    return (
        <div>
            <form onSubmit={addNewSubject} method='POST'>

                <SubjectFormInputs t={t} classListData={classListData}/>

                <div className={css.form_div}>
                    <Label className={'bp3-inline'} htmlFor='cSelect'>{t('general.selectClass')}
                        <HTMLSelect type='text' name='room' id={'cSelect'} className={css.dropdown_width}>
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

const mapDispatchToProps = {addNewSubject};

export default connect(null, mapDispatchToProps)(withTranslation()(SubjectForm));
