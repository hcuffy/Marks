import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import SubjectModal from './SubjectModal';
import {generateSubjectList, filterSubjects} from './formHelpers';
import css from './styles/subject.css';

function SubjectList({t, selectedSubject, subjectData, actions}) {
    const filteredData = filterSubjects(selectedSubject, subjectData);
    const subjectList = generateSubjectList(filteredData, actions.subjectModalDisplay);

    return (
        <div className={css.list_div}>
            <SubjectModal t={t} filteredData={filteredData} />

            <div className='list-group list-group-flush'>{subjectList}</div>
        </div>
    );
}

const mapStateToProps = state => ({
    subjectData: state.subjectData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SubjectList));
