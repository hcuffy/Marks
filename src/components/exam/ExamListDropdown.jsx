import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {resolveLabel} from '../../utils';
import {showClass, showExamList} from './actions';
import {DropdownComponent, createDropdownItems} from '../helpers';
import css from './style.css';

function ExamListDropdown({t, classData, examData, subjectData, showClass, showExamList}) {
    const {classroomId, subjectId} = examData;
    const classes = classData?.classData;
    const subjects = _.filter(subjectData?.data, {classroomId}) || {};

    const selectedClass = _.find(classes, {_id: classroomId}) || {};
    const selectedSubject = _.find(subjects, {_id: subjectId}) || {};

    const items = createDropdownItems(classes, 'classDropdown');
    const label = resolveLabel(selectedClass?.name, t('general.selectClass'));

    const subjectItems = createDropdownItems(subjects, 'subjectDropdown');
    const subjectLabel = resolveLabel(selectedSubject?.name, t('general.selectSubject'));

    return (
        <div className={css.dropdown_main_div}>
            <div className={css.left_dropdown}>
                <DropdownComponent
                    items={items}
                    action={showClass}
                    label={label}
                    disabled={_.isEmpty(classes)}
                />
            </div>

            <div className={css.right_dropdown}>
                <DropdownComponent
                    items={subjectItems}
                    action={showExamList}
                    label={subjectLabel}
                    disabled={_.isEmpty(subjects)}
                />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    classData:   state.classData,
    subjectData: state.subjectData,
    examData:    state.examData
});

const mapDispatchToProps = {showClass, showExamList};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ExamListDropdown));
