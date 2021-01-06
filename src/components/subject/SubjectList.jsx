import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import SubjectDialog from './SubjectDialog';
import {List, filterSubjects} from './formHelpers';
import css from './styles/subject.css';

function SubjectList({t, selectedClass, subjectData, actions}) {
    const filteredData = filterSubjects(selectedClass, subjectData);

    return (
        <div className={css.list_div}>
            <SubjectDialog t={t} filteredData={filteredData} />
            <div>
                <List filteredData={filteredData} action={actions.displaySubjectDialog}/>
            </div>
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
