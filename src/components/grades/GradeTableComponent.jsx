import React from 'react';
import _ from 'lodash';
import ReactTable from 'react-table-6';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import GradeDropdown from './GradeDropdown';
import {gradeColumns} from './gradeColumns';
import {gradeInfo} from './gradeInfo';
import css from './style.css';

function tableOptions(t) {
    return {
        defaultPageSize: 20,
        noDataText:      t('grades.noData'),
        previousText:    t('grades.previousPage'),
        nextText:        t('grades.nextPage'),
        pageText:        t('grades.textPage'),
        ofText:          t('grades.pageOf'),
        rowsText:        t('grades.textRows')
    };
}

function GradeTableComponent({t, gradeData, students, actions}) {
    const data = gradeInfo(gradeData, students);

    return (
        <div className={css.div_wrapper}>
            <h4 className={css.center_header}>{t('grades.gradesTitle')}</h4>

            <GradeDropdown t={t} />

            <ReactTable
                data={_.sortBy(data, ['name'], ['asc'])}
                columns={gradeColumns({t, newData: data, actions})}
                className='-striped -highlight'
                style={{height: '650px'}}
                {...tableOptions(t)}
            />
        </div>
    );
}

const mapStateToProps = state => ({
    gradeData: state.gradeData,
    students:  state.studentData.students
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(GradeTableComponent));
