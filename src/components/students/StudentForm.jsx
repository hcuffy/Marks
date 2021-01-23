import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {Button, Intent} from '@blueprintjs/core';

import {actionCreators} from '../../actions/index';
import {ClassroomSelect, GenderSelect, NameInputFields} from './formHelper';
import css from './styles/students.css';

function AddStudentForm({t, studentData, classData, actions}) {
    return (<div className={css.student_div}>
        <form onSubmit={actions.addNewStudent} method='POST'>
            <div className={css.form_outer_div}>
                <h4 className={css.center_add_sub_header}>{t('student.add')}</h4>
                <NameInputFields t={t} studentData={studentData}/>
                <GenderSelect t={t} gender={'male'}/>
                <ClassroomSelect t={t} classData={classData.classData} classroom={null}/>

                <div className={(css.form_inner_div, css.save_btn)}>
                    <Button type='submit' intent={Intent.SUCCESS} text={t('general.add')}/>
                </div>
            </div>
        </form>
    </div>);
}

const mapStateToProps = state => ({
    studentData: state.studentData,
    classData:   state.classData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(AddStudentForm));
