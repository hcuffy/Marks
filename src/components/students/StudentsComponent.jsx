import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import AddStudentForm from './StudentForm';
import StudentList from './StudentList';
import StudentChart from './StudentChart';
import StudentDropdown from './StudentDropdown';
import css from './style.css';

function StudentsComponent({t}) {
    return (
        <div>
            <div>
                <h4 className={css.center_header}>{t('student.title')}</h4>
                <AddStudentForm/>
                <StudentList t={t}/>
            </div>

            <div className={css.chart_div}>
                <h4 className={css.chart_header}>{t('student.chartTitle')}</h4>
                <StudentDropdown/>
                <StudentChart t={t}/>
            </div>
        </div>
    );
}

export default connect(null, null)(withTranslation()(StudentsComponent));
