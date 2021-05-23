import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import SubjectForm from './SubjectForm';
import SubjectList from './SubjectList';
import {resolveLabel} from '../../utils';
import {getSubject} from './actions';
import {DropdownComponent, createDropdownItems} from '../helpers';
import css from './style.css';

function SubjectsComponent({t, classes, classListData, getSubject}) {
    const {classroom} = classListData;
    const selectedClass = _.find(classes, {name: classroom}) || {};
    const items = createDropdownItems(classes, 'classDropdown');
    const label = resolveLabel(selectedClass.name, t('general.selectClass'));

    return (
        <div className={css.main_div}>
            <div className={css.subject_left}>
                <h4 className={css.subject_header}>{t('room.subjectHeader')}</h4>

                <DropdownComponent items={items} action={getSubject} label={label} disabled={_.isEmpty(classes)}/>

                <SubjectList t={t} selectedClass={selectedClass} />
            </div>
            <div className={css.subject_right}>
                <h4 className={css.add_header}>{t('room.addSubject')}</h4>

                <SubjectForm t={t} classListData={classListData} classes={classes} />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    classListData: state.classListData
});

const mapDispatchToProps = {getSubject};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SubjectsComponent));
