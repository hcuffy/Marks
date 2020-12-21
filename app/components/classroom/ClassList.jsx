import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import RoomModal from './RoomModal';
import {sortData, classInputs} from './formHelpers';
import css from './styles/room.css';

function ClassList({t, listData, actions}) {
    const cleanedData = sortData(listData);
    const listInputs = classInputs(cleanedData, actions.roomModalDisplay);

    return (
        <div className={css.list_div}>
            <RoomModal t={t} modalData={cleanedData} />

            <div className='list-group list-group-flush'>{listInputs}</div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(withTranslation()(ClassList));
