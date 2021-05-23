import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Alignment, ButtonGroup, Button, Icon} from '@blueprintjs/core';

import {showExamDialog} from './actions';
import css from './style.css';

function ExamListInputs({exams, subjectId, showExamDialog}) {
    const filteredExams = _.filter(exams, ['subjectId', subjectId]);

    return _.map(filteredExams, (data, idx) => (
        <div key={idx} className={css.list_buttons}>
            <ButtonGroup alignText={Alignment.LEFT} vertical={true} fill={true}>
                <Button
                    onClick={showExamDialog}
                    text={data.title}
                    data-id={data._id}
                >

                    <span className={`badge badge-light badge-pill ${css.badge_number}`}>
                        { <Icon icon='calendar' iconSize={13} className={css.button_icon} />}
                        {moment(data.date).format('L') }
                    </span>

                    <span className={`badge badge-warning badge-pill ${css.badge_number}`}>
                        { <Icon icon='layers' iconSize={13} className={css.button_icon} />}
                        {data.weight}
                    </span>
                </Button>
            </ButtonGroup>
        </div>

    ));
}

const mapStateToProps = state => ({
    exams:     state.examData.exams,
    subjectId: state.examData.subjectId
});

const mapDispatchToProps = {showExamDialog};

export default connect(mapStateToProps, mapDispatchToProps)(ExamListInputs);
