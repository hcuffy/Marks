import React from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {Button} from 'reactstrap';
import css from './styles/exam.css';

function ExamListInputs({exams, subjectId, actions}) {
    const filteredExams = _.filter(exams, ['subjectId', subjectId]);

    const examList = _.map(filteredExams, (data, idx) => (
        <Button
            key={idx}
            data-id={data._id}
            type='button'
            className={`list-group-item list-group-item-action ${css.list_btn}`}
            onClick={actions.showSingleExam}
        >
            {data.title}

            <span className={`badge badge-light badge-pill ${css.badge_number}`}>
                <i className='fas fa-calendar' /> {dayjs(data.date).format('L')}
            </span>

            <span className={`badge badge-warning badge-pill ${css.badge_number}`}>
                <i className='fas fa-weight-hanging' /> {data.weight}
            </span>
        </Button>
    ));

    return (
        <div className={`list-group list-group-flush ${css.exam_div}`}>
            {examList}
        </div>
    );
}

const mapStateToProps = state => ({
    exams:     state.examData.exams,
    subjectId: state.examData.subjectId
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ExamListInputs);
