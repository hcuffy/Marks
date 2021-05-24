import React from 'react';
import _ from 'lodash';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';

import {capabilityClassList, capabilityStudentList, updateQuestionSet} from './actions';
import {DropdownComponent, createDropdownItems} from '../helpers';
import {capabilityQuestions} from './constants';
import {resolveLabel} from '../../utils';
import css from './style.css';

function CapabilityDropdown({t, capabilityData, classData, students, capabilityClassList, capabilityStudentList, updateQuestionSet}) {
    const {classroom, studentName, classroomId, questionSetName} = capabilityData;

    const classItems = createDropdownItems(classData?.classData, 'classDropdown');
    const classLabel = resolveLabel(classroom, t('general.selectClass'));

    const classStudents = _.filter(students, {classroom: classroomId}) || {};
    const studentItems = createDropdownItems(classStudents, 'studentDropdown');
    const studentLabel = resolveLabel(studentName, t('general.selectStudent'));

    const composedQuestionObject = {t, classroomId, capabilityQuestions};
    const questionItems = createDropdownItems(composedQuestionObject, 'questionDropdown');
    const questionLabel = resolveLabel(questionSetName, t('general.selectQuestions'));

    return (
        <div className={css.dropdown_main_div}>
            <div>
                <DropdownComponent
                    items={classItems}
                    action={capabilityClassList}
                    label={classLabel}
                    disabled={_.isEmpty(classData?.classData) }
                />
            </div>

            <div className={css.middle_dropdown}>
                <DropdownComponent
                    items={studentItems}
                    action={capabilityStudentList}
                    label={studentLabel}
                    disabled={_.isEmpty(students)}
                />
            </div>

            <div>
                <DropdownComponent
                    items={questionItems}
                    action={updateQuestionSet}
                    label={questionLabel}
                    disabled={_.isEmpty(studentName) && !_.isNull(classroomId)}
                />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    capabilityData: state.capabilityData,
    classData:      state.classData,
    students:       state.studentData.students
});

const mapDispatchToProps = {capabilityClassList, capabilityStudentList, updateQuestionSet};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CapabilityDropdown));
