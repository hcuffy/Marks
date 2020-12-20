import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {resolveLabel} from '../../utils';
import {actionCreators} from '../../actions/index';
import {sortData} from '../rooms/helpers/formHelpers';
import {getClassList, getSubjectList, createDropdown, notifyIfEmpty, getClassroomName} from '../helpers/dropdowns';
import css from './styles/grades.css';

function GradeDropdown({t, classData, gradeData, subjectData, actions}) {
    const {subDrop, subjectName, classroomId, classroomDropdown} = gradeData;
    const openIt = {subDrop};
    const classOptions = getClassList(sortData(classData));
    const classroom = _.isNull(classroomId) ? classroomId : getClassroomName(classroomId, classData.classData);
    const subjectOptions = getSubjectList({selectedRoom: classroomId}, subjectData);

    if (_.isEmpty(subjectOptions) && subDrop) {
        notifyIfEmpty(t, [], true, 'class');
        openIt.subDrop = false;
    }

    return (
        <div className={css.dropdown_main_div}>
            {createDropdown(
                css.dropdown_div,
                classroomDropdown,
                actions.openGradeClassList,
                resolveLabel(classroom, t('general.selectClass')),
                classOptions,
                'classDropdown'
            )}
            {createDropdown(
                css.dropdown_div,
                subDrop,
                actions.displayGradeData,
                resolveLabel(subjectName, t('general.selectSubject')),
                subjectOptions,
                'subjectDropdown'
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    classData:   state.classData,
    subjectData: state.subjectData,
    gradeData:   state.gradeData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(GradeDropdown));
