import React from 'react';
import {withTranslation} from 'react-i18next';

import AddExamForm from './ExamForm';
import ExamList from './ExamList';
import css from './style.css';

function Exam({t}) {
    return (
        <div>
            <div className={css.header_div}>
                <h4>{t('exam.addExamHeader')}</h4>
                <AddExamForm />
            </div>

            <div>
                <ExamList t={t} />
            </div>
        </div>
    );
}

export default withTranslation()(Exam);
