import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {DialogFrame} from '../helpers';
import {actionCreators} from '../../actions/index';
import {filterObjectData} from '../classroom/formHelpers';
import {DialogInputs, resolveHiddenInput} from './dialogHelper';

function StudentDialog({t, studentData, classData, actions}) {
    const {studentId, showDialog, students} = studentData;
    const student = filterObjectData(students, studentId);
    const studentFields = <DialogInputs t={t} student={student} classData={classData} studentData={studentData}/>;
    const hiddenInput = resolveHiddenInput(studentId);
    const {deleteSingleStudent, showStudentDialog, updateStudent} = actions;
    const footerData = {dataId: studentId, nameId: null, closeId: studentId, deleteAction: deleteSingleStudent};

    return (
        <div>
            {DialogFrame(t, showDialog, updateStudent, studentFields, hiddenInput, footerData, showStudentDialog)}
        </div>
    );
}

const mapStateToProps = state => ({
    studentData: state.studentData,
    classData:   state.classData.classData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(StudentDialog));
