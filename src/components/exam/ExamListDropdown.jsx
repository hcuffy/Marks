import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {resolveLabel} from '../../utils';
import {actionCreators} from '../../actions/index';
import {sortByName, DropdownComponent, createDropdownItems} from '../helpers';
import css from './styles/exam.css';

function ExamListDropdown({t, classData, examData, subjectData, actions}) {
    const {classroomId, selectedSubject} = examData;
    const classes = sortByName(classData?.classData);
    const subjects = sortByName(subjectData?.data);

    const selectedClass = _.find(classes, {_id: classroomId}) || {};
    const items = createDropdownItems(classes, 'classDropdown');
    const label = resolveLabel(selectedClass?.name, t('general.selectClass'));

    const subjectItems = createDropdownItems(subjects, 'subjectDropdown');
    const subjectLabel = resolveLabel(selectedSubject?.name, t('general.selectSubject'));

    return (
        <div className={css.dropdown_main_div}>
            <div className={css.left_dropdown}>
                <DropdownComponent items={items} action={actions.showClass} label={label}/>
            </div>

            <div className={css.right_dropdown}>
                <DropdownComponent items={subjectItems} action={actions.showExamList} label={subjectLabel}/>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    classData:   state.classData,
    subjectData: state.subjectData,
    examData:    state.examData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ExamListDropdown));
