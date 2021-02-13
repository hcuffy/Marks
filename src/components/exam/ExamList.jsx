import React from 'react';
import {withTranslation} from 'react-i18next';

import ExamListDropdown from './ExamListDropdown';
import ExamListInputs from './ExamListInputs';
import ExamDialog from './ExamDialog';
import css from './style.css';

function ExamList({t}) {
    return (
        <div className={css.main_div}>
            <div className={css.edit_div}>
                <h4 className={css.edit_header}>{t('exam.editExamHeader')}</h4>
                <ExamListDropdown t={t} />
            </div>

            <div>
                <ExamListInputs />
                <ExamDialog t={t} />
            </div>
        </div>
    );
}

export default withTranslation()(ExamList);
