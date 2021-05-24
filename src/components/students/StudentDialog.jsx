import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {DialogFrame} from '../helpers';
import {deleteSingleStudent, showStudentDialog, updateStudent} from './actions';
import {filterObjectData} from '../classroom/formHelpers';
import {DialogInputs, resolveHiddenInput} from './dialogHelper';

function StudentDialog({t, studentData, classData, deleteSingleStudent, showStudentDialog, updateStudent}) {
    const {studentId, showDialog, students} = studentData;
    const student = filterObjectData(students, studentId);
    const studentFields = <DialogInputs t={t} student={student} classData={classData} studentData={studentData}/>;
    const hiddenInput = resolveHiddenInput(studentId);
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

const mapDispatchToProps = {deleteSingleStudent, showStudentDialog, updateStudent};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(StudentDialog));
