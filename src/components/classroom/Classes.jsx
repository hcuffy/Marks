import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import ClassList from './ClassList';
import Subjects from '../subject/Subjects';
import {AddClassroomForm, checkChange} from './formHelpers';
import css from './styles/room.css';

function Classes({t, classData, actions}) {
    checkChange(classData, actions);

    return (
        <div>
            <AddClassroomForm/>

            <div>
                <h4 className={css.list_header}>{t('room.listHeader')}</h4>

                <ClassList t={t} listData={classData} />
            </div>

            <Subjects t={t} classData={classData} />
        </div>
    );
}

const mapStateToProps = state => ({
    classData: state.classData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Classes));
