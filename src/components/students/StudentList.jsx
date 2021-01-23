import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import StudentDialog from './StudentDialog';
import {actionCreators} from '../../actions/index';
import {generateStudentList} from './formHelper';
import css from './styles/students.css';

function StudentList({t, students, actions}) {
    const listData = generateStudentList(students, actions);

    return (
        <div className={css.student_list}>
            <h4 className={css.center_sub_header}>{t('student.list')}</h4>
            <div className={css.list_div}>
                <div className='list-group list-group-flush'>{listData}</div>

                <StudentDialog t={t} />
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    students: state.studentData.students
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(StudentList));
