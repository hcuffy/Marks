import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import RoomDialog from './RoomDialog';
import {actionCreators} from '../../actions/index';
import {ClassroomList} from './formHelpers';
import css from './style.css';

function ClassList({t}) {
    return (
        <div className={css.list_div}>
            <RoomDialog t={t} />
            <ClassroomList/>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(withTranslation()(ClassList));
