import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {DropdownComponent, createDropdownItems} from '../helpers';
import {resolveLabel} from '../../utils';
import css from './style.css';

function NotesDropdown({t, studentData, notesData, actions}) {
    const {students} = studentData;
    const {selectedName, studentId, noteId} = notesData;

    const studentItems = createDropdownItems(students, 'studentDropdown');
    const studentLabel = resolveLabel(selectedName, t('general.selectStudent'));

    const notes = _.filter(notesData?.notes, {studentId}) || {};
    const notesItems = createDropdownItems(notes, 'notesDropdown');
    const selectedNote = _.find(notes, {_id: noteId}) || {};
    const notesLabel = resolveLabel(selectedNote.Title, t('general.selectNote'));

    return (
        <div className={css.dropdown_main_div}>
            <div className={css.left_dropdown}>
                <DropdownComponent
                    items={studentItems}
                    action={actions.handleStudentDropdown}
                    label={studentLabel}
                    disabled={_.isEmpty(students)}
                />
            </div>
            <div className={css.right_dropdown}>
                <DropdownComponent
                    items={notesItems}
                    action={actions.handleNotesDropdown}
                    label={notesLabel}
                    disabled={_.isEmpty(notes)}
                />
            </div>
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
