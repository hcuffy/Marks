import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {getStudentList, getNotesList, createDropdown, notifyIfEmpty} from '../helpers';
import {resolveLabel} from '../../utils';
import css from './styles/notes.css';

function NotesDropdown({t, studentData, notesData, actions}) {
    const {students} = studentData;
    const {studentDropdown, notesDropdown, selectedStudent, selectedNote, studentId, notes, textField} = notesData;
    const studentOptions = getStudentList(students);
    const notesOptions = getNotesList(notes, studentId);

    if (_.isEmpty(textField) === true) {
        notifyIfEmpty(t, notesOptions, notesDropdown, 'student');
    }

    return (
        <div className={css.dropdown_main_div}>
            {createDropdown(
                css.dropdown_one,
                studentDropdown,
                actions.openStudentDropdown,
                resolveLabel(selectedStudent, t('general.selectStudent')),
                studentOptions,
                'studentDropdown'
            )}

            {createDropdown(
                css.dropdown_two,
                notesDropdown,
                actions.openNotesDropdown,
                resolveLabel(selectedNote, t('general.selectNote')),
                notesOptions,
                'notesDropdown'
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    studentData: state.studentData,
    notesData:   state.notesData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NotesDropdown));
