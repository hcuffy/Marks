import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {resolveLabel} from '../../utils';
import {actionCreators} from '../../actions/index';
import SubjectForm from './SubjectForm';
import SubjectList from './SubjectList';
import {createDropdown, subjectOptions} from '../helpers';
import {sortData} from '../classroom/formHelpers';
import css from './styles/subject.css';

function Subjects({t, classData, classListData, actions}) {
    const subjects = sortData(classData);
    const {subject, openModal} = classListData;
    const selectedSubject = _.find(subjects, {name: subject}) || {};
    const options = subjectOptions(subjects, actions);

    return (
        <div className={css.main_div}>
            <div className={css.subject_left}>
                <h4 className={css.subject_header}>{t('room.subjectHeader')}</h4>

                {createDropdown(
                    null,
                    openModal,
                    actions.openClassList,
                    resolveLabel(subject, t('general.selectClass')),
                    options,
                    'classDropdown'
                )}

                <SubjectList t={t} selectedSubject={selectedSubject} />
            </div>
            <div className={css.subject_right}>
                <h4 className={css.add_header}>{t('room.addSubject')}</h4>

                <SubjectForm t={t} classListData={classListData} subjects={subjects} />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    classListData: state.classListData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Subjects));
