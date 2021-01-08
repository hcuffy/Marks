import React from 'react';
import {withTranslation} from 'react-i18next';

import StudentForm from './StudentForm';
import StudentList from './StudentList';
import StudentChart from './StudentChart';
import StudentDropdown from './StudentDropdown';
import css from './styles/students.css';

function StudentsSection({t}) {
    return (
        <div>
            <div>
                <h4 className={css.center_header}>{t('student.title')}</h4>

                <StudentForm t={t} />

                <StudentList t={t} />
            </div>

            <div className={css.chart_div}>
                <h4 className={css.chart_header}>{t('student.chartTitle')}</h4>

                <StudentDropdown t={t} />

                <StudentChart t={t} />
            </div>
        </div>
    );
}

export default withTranslation()(StudentsSection);
