import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';
import {addExamToSubjectArray, updateSubjectTestArray} from './subject';
import {deleteGradesByExamId} from './grade';

const Exam = connectionToDB('examinations');

export const addExamData = data => {
    Exam.find({name: data.title}, (error, entry) => {
        if (error) {
            displayToast('saveFail');
        }
        if (entry.length > 0) {
            displayToast('exists');
        }
        const newData = data;

        Exam.insert(newData, (error, doc) => {
            if (error) {
                displayToast('saveFail');
            }
            displayToast('saveSuccess');
            addExamToSubjectArray(newData);

            return doc;
        });
    });
};

export const getAllExams = () => new Promise(resolve => Exam.find({}, (error, entry) => {
    if (error) {
        displayToast('retrieveFail');
    }

    return resolve(entry);
}));

const updateTestsArr = async(examId, subjectId) => {
    let examTitle = '';
    Exam.find({_id: examId}, (error, entry) => {
        if (error) {
            displayToast('updateFail');
        }
        examTitle = entry[0].title;
    });
    await updateSubjectTestArray(subjectId, examTitle);
};

export const deleteExam = ({examId, subjectId}) => new Promise(resolve => {
    updateTestsArr(examId, subjectId);
    Exam.remove({_id: examId}, error => {
        if (error) {
            displayToast('deleteFail');
        }

        Exam.find({}, (error, exams) => {
            if (error) {
                displayToast('deleteFail');
            }
            deleteGradesByExamId(examId);

            return resolve(exams);
        });
    });
});

const updateSingleExam = (previous, current) => {
    const {title, date, weight} = current;
    const {subjectId} = previous;

    Exam.update(
        {_id: previous._id},
        {
            title,
            date,
            weight,
            subjectId
        },
        {},
        error => {
            if (error) {
                displayToast('updateFail');
            }
            displayToast('updateSuccess');
        }
    );
};

export const updateExamData = data => new Promise(resolve => {
    const {examId, subjectId, title} = data;
    Exam.find({_id: examId}, (error, entry) => {
        if (error) {
            displayToast('updateFail');
        }
        if (entry.length > 0) {
            updateSingleExam(entry[0], data);
            updateSubjectTestArray(subjectId, entry[0].title);
            addExamToSubjectArray({subjectId, title});
            Exam.find({}, (error, docs) => {
                if (error) {
                    displayToast('updateFail');
                }

                return resolve(docs);
            });
        }
    });
});
