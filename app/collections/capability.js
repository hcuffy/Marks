import connectionToDB from './connectionSetup';
import {displayToast} from '../notifications';

const Capability = connectionToDB('question');

export async function getAllQuestions() {
    await new Promise(resolve => Capability.find({}, (error, docs) => {
        if (error) {
            displayToast('retrieveFail');
        }

        return resolve(docs);
    }));
}

const addNewQuestion = data => {
    Capability.insert(data, error => {
        if (error) {
            displayToast('saveFail');
        }
        displayToast('saveSuccess');
    });
};

const updateQuestion = data => {
    const {classroomId, questionSet} = data;

    Capability.update({classroomId}, {$set: {questionSet}}, {}, error => {
        if (error) {
            displayToast('updateFail');
        }
        displayToast('updateSuccess');
    });
};

export const updateQuestionData = data => new Promise(resolve => {
    const {classroomId} = data;

    Capability.find({classroomId}, (error, entry) => {
        if (error) {
            displayToast('updateFail');
        }

        if (entry.length > 0) {
            updateQuestion(data);
        } else {
            addNewQuestion(data);
        }
        Capability.find({}, (error, docs) => {
            if (error) {
                displayToast('updateFail');
            }

            return resolve(docs);
        });
    });
});
