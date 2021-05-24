import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {displaySubjectDialog} from './actions';
import SubjectDialog from './SubjectDialog';
import {List, filterSubjectByClass} from './formHelpers';
import css from './style.css';

function SubjectList({t, selectedClass, subjectData, displaySubjectDialog}) {
    const filteredData = filterSubjectByClass(selectedClass, subjectData);

    return (
        <div className={css.list_div}>
            <SubjectDialog t={t} filteredData={filteredData}/>

            <List filteredData={filteredData} action={displaySubjectDialog}/>

        </div>
    );
}

const mapStateToProps = state => ({
    subjectData: state.subjectData
});

const mapDispatchToProps = {displaySubjectDialog};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(SubjectList));
