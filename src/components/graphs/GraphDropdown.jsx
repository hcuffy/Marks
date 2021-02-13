import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {resolveLabel, PDFbutton} from '../../utils';
import {actionCreators} from '../../actions/index';
import {DropdownComponent, createDropdownItems} from '../helpers';
import css from './style.css';
import _ from 'lodash';

function GraphDropdown({t, classData, graphData, subjectData, actions}) {
    const {subjectId, exams, classroomId, examId, chartTitle} = graphData;

    const classes = classData?.classData;
    const items = createDropdownItems(classes, 'classDropdown');
    const selectedClass = _.find(classes, {_id: classroomId}) || {};
    const label = resolveLabel(selectedClass.name, t('general.selectClass'));

    const subjects = _.filter(subjectData?.data, {classroomId}) || {};
    const selectedSubject = _.find(subjects, {_id: subjectId}) || {};
    const subjectItems = createDropdownItems(subjects, 'subjectDropdown');
    const subjectLabel = resolveLabel(selectedSubject?.name, t('general.selectSubject'));

    const subjectExams = _.filter(exams, {subjectId}) || {};
    const selectedExam = _.find(subjectExams, {_id: examId}) || {};
    const examItems = createDropdownItems(subjectExams, 'examDropdown');
    const examLabel = resolveLabel(selectedExam?.name, t('general.selectExam'));

    return (
        <div className={css.dropdown_main_div}>
            <div className={css.left_dropdown}>
                <DropdownComponent
                    items={items}
                    action={actions.handleGraphClassList}
                    label={label}
                    disabled={_.isEmpty(classes)}
                />
            </div>
            <div className={css.middle_dropdown}>
                <DropdownComponent
                    items={subjectItems}
                    action={actions.handleSubjectList}
                    label={subjectLabel}
                    disabled={_.isEmpty(subjects)}
                />
            </div>
            <div className={css.right_dropdown}>
                <DropdownComponent
                    items={examItems}
                    action={actions.displayExamGraph}
                    label={examLabel}
                    disabled={_.isEmpty(subjectExams)}
                />
            </div>
            {PDFbutton(t('general.saveAs'), resolveLabel(chartTitle, t('graph.schoolGrades')), css)}
        </div>
    );
}

const mapStateToProps = state => ({
    classData:   state.classData,
    subjectData: state.subjectData,
    graphData:   state.graphData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(GraphDropdown));
