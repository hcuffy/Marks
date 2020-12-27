import _ from 'lodash';
import {actions} from './constants';
import {addNewStudentData, getAllStudents, deleteStudent, updateStudentData} from '../../collections';
import {inputValidation} from '../helpers/formValidation';

export function getOption(event, propToGet) {
    const index = event.target[propToGet].selectedIndex;

    return event.target[propToGet].options[index].getAttribute('data-id');
}

export function addNewStudent(event) {
    return async dispatch => {
        event.preventDefault();

        const formData = {
            firstname: event.target.firstname.value,
            lastname:  event.target.lastname.value,
            gender:    getOption(event, 'gender'),
            classroom: getOption(event, 'classroom')
        };

        const inputsToValidate = _.pick(formData, ['firstname', 'lastname']);

        if (inputValidation(inputsToValidate)) {
            dispatch({
                type:    actions.STUDENT_FORM_VALIDATION,
                payload: {...inputsToValidate, isInvalid: true}
            });
        } else {
            await addNewStudentData(formData);
            event.target.reset();
            const students = await getAllStudents();

            dispatch({
                type:    actions.ADD_NEW_STUDENT,
                payload: {firstname: '', lastname: '', isInvalid: false}
            });

            dispatch({
                type:    actions.GET_ALL_STUDENTS,
                payload: {students, isInvalid: false}
            });
        }
    };
}

export function getStudents() {
    return async dispatch => {
        const students = await getAllStudents();

        if (_.size(students)) {
            dispatch({
                type:    actions.GET_ALL_STUDENTS,
                payload: {students}
            });
        }
    };
}

export function showStudentModal(event) {
    return dispatch => {
        const studentId = event.target.getAttribute('data-id');

        dispatch({
            type:    actions.GET_SINGLE_STUDENT,
            payload: {studentId, isModalInvalid: false}
        });
    };
}

export function openStudentGraph(event) {
    return dispatch => {
        if (event.target.getAttribute('data-check') !== 'studentDropdown') {
            return;
        }

        const student = {
            studentGraphId:   event.target.getAttribute('data-id'),
            studentGraphName: event.target.innerText,
            chartToDisplay:   'student'
        };

        dispatch({
            type:    actions.DISPLAY_STUDENT_GRAPH,
            payload: student
        });
    };
}

export function openStudentSubjectGraph(event) {
    return dispatch => {
        if (event.target.getAttribute('data-check') !== 'subjectDropdown') {
            return;
        }

        const subject = {
            subjectGraphId:   event.target.getAttribute('data-id'),
            subjectGraphName: event.target.innerText,
            chartToDisplay:   'subject'
        };

        dispatch({
            type:    actions.DISPLAY_STUDENT_SUBJECT_GRAPH,
            payload: subject
        });
    };
}

export function updateStudent(event) {
    return async dispatch => {
        event.preventDefault();

        const studentId = event.target.studentId.getAttribute('data-id');

        const studentData = {
            firstname: event.target.firstname.value,
            lastname:  event.target.lastname.value,
            gender:    getOption(event, 'gender'),
            classroom: getOption(event, 'classroom'),
            id:        studentId
        };
        const inputsToValidate = _.pick(studentData, ['firstname', 'lastname']);

        if (inputValidation(inputsToValidate)) {
            dispatch({
                type:    actions.STUDENT_FORM_VALIDATION,
                payload: {...inputsToValidate, isModalInvalid: true}
            });
        } else {
            const students = await updateStudentData(studentData);

            dispatch({
                type:    actions.GET_SINGLE_STUDENT,
                payload: {studentId, isModalInvalid: false}
            });

            dispatch({
                type:    actions.GET_ALL_STUDENTS,
                payload: {students, isModalInvalid: false}
            });
        }
    };
}

export function deleteSingleStudent(event) {
    return async dispatch => {
        const studentId = event.target.getAttribute('data-id');
        const students = await deleteStudent(studentId);

        dispatch({
            type:    actions.GET_SINGLE_STUDENT,
            payload: {studentId}
        });

        dispatch({
            type:    actions.GET_ALL_STUDENTS,
            payload: {students}
        });
    };
}