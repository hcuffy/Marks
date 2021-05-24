import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {resolveLabel} from '../../utils';
import {handleGradeClassList, showGradeData} from './actions';
import {DropdownComponent, createDropdownItems} from '../helpers';
import css from './style.css';

function GradeDropdown({t, classData, gradeData, subjectData, handleGradeClassList, showGradeData}) {
    const {subjectId, classroomId, classroom} = gradeData;

    const classes = classData?.classData;
    const items = createDropdownItems(classes, 'classDropdown');
    const label = resolveLabel(classroom, t('general.selectClass'));

    const subjects = _.filter(subjectData?.data, {classroomId}) || {};
    const selectedSubject = _.find(subjects, {_id: subjectId}) || {};
    const subjectItems = createDropdownItems(subjects, 'subjectDropdown');
    const subjectLabel = resolveLabel(selectedSubject?.name, t('general.selectSubject'));

    return (
        <div className={css.dropdown_main_div}>
            <div className={css.left_dropdown}>
                <DropdownComponent
                    items={items}
                    action={handleGradeClassList}
                    label={label}
                    disabled={_.isEmpty(classes)}
                />
            </div>
            <div className={css.right_dropdown}>
                <DropdownComponent
                    items={subjectItems}
                    action={showGradeData}
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
    gradeData:   state.gradeData
});

const mapDispatchToProps = {handleGradeClassList, showGradeData};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(GradeDropdown));
