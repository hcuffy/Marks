import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import SubjectDialog from './SubjectDialog';
import {actionCreators} from '../../actions/index';
import {List, filterSubjectByClass} from './formHelpers';
import css from './styles/subject.css';

function SubjectList({t, selectedClass, subjectData, actions}) {
    const filteredData = filterSubjectByClass(selectedClass, subjectData);

    return (
        <div className={css.list_div}>
            <SubjectDialog t={t} filteredData={filteredData} />

            <List filteredData={filteredData} action={actions.displaySubjectDialog}/>

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
