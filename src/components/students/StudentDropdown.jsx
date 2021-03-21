import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {resolveLabel, PDFbutton} from '../../utils';
import {DropdownComponent, createDropdownItems} from '../helpers';
import css from './style.css';

function StudentDropdown({t, studentData, subjectData, actions}) {
    const {students, studentName, classroomId, subjectName} = studentData;
    const subjects = _.filter(subjectData?.data, {classroomId}) || {};

    const studentItems = createDropdownItems(students, 'studentDropdown');
    const studentLabel = resolveLabel(studentName, t('general.selectStudent'));

    const subjectItems = createDropdownItems(subjects, 'subjectDropdown');
    const subjectLabel = resolveLabel(subjectName, t('general.selectSubject'));

    return (
        <div className={css.dropdown_main_div}>
            <div className={css.left_dropdown}>
                <DropdownComponent
                    items={studentItems}
                    action={actions.showStudentGraph}
                    label={studentLabel}
                    disabled={_.isEmpty(students)}
                />
            </div>
            <div className={css.right_dropdown}>
                <DropdownComponent
                    items={subjectItems}
                    action={actions.showSubjectGraph}
                    label={subjectLabel}
                    disabled={false}
                />
            </div>
            {PDFbutton(t('general.saveAs'), resolveLabel(subjectName, t('student.defaultHeader')), css)}
        </div>
    );
}

const mapStateToProps = state => ({
    studentData: state.studentData,
    subjectData: state.subjectData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(StudentDropdown));
