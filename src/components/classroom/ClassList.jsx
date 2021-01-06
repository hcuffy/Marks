import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import RoomDialog from './RoomDialog';
import {ClassroomList} from './formHelpers';
import css from './styles/room.css';

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
