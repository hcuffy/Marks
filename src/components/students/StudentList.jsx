import React from 'react';

import StudentDialog from './StudentDialog';
import {ListOfStudent} from './formHelper';
import css from './style.css';

function StudentList({t}) {
    return (
        <div className={css.student_list}>
            <h4 className={css.center_sub_header}>{t('student.list')}</h4>
            <div className={css.list_div}>
                <div>
                    <ListOfStudent/>
                </div>

                <StudentDialog/>
            </div>
        </div>
    );
}

export default StudentList;
