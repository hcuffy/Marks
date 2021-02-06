import React from 'react';
import _ from 'lodash';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {DropdownComponent, createDropdownItems} from '../helpers';
import {capabilityQuestions} from './constants';
import {changeQuestionBtn} from './table';
import {resolveLabel} from '../../utils';
import css from './styles/capability.css';

function CapabilityDropdown({t, capabilityData, classData, students, actions}) {
    const {classroom, studentName, questions, classroomId, questionList} = capabilityData;

    const classItems = createDropdownItems(classData?.classData, 'classDropdown');
    const classLabel = resolveLabel(classroom, t('general.selectClass'));

    const classStudents = _.filter(students, {classroom: classroomId}) || {};
    const studentItems = createDropdownItems(classStudents, 'studentDropdown');
    const studentLabel = resolveLabel(studentName, t('general.selectStudent'));

    const composedQuestionObject = {t, classroomId, capabilityQuestions};
    const questionItems = createDropdownItems(composedQuestionObject, 'questionDropdown');
    const questionLabel = resolveLabel(questionList, t('general.selectQuestions'));

    console.log(questions);
    /*const questionOptions = getQuestionList(t, classroomId, capabilityQuestions, actions);
    const actualSet = getQuestionSet(classroomId, questions);*/

    return (
        <div className={css.dropdown_main_div}>
            <div>
                <DropdownComponent
                    items={classItems}
                    action={actions.capabilityClassList}
                    label={classLabel}
                    disabled={_.isEmpty(classData?.classData) }
                />
            </div>

            <div className={css.middle_dropdown}>
                <DropdownComponent
                    items={studentItems}
                    action={actions.capabilityStudentList}
                    label={studentLabel}
                    disabled={_.isEmpty(students)}
                />
            </div>

            <div>
                <DropdownComponent
                    items={questionItems}
                    action={actions.updateQuestionSet}
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

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CapabilityDropdown));
