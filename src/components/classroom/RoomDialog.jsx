import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {DialogFrame} from '../helpers';
import {filterObjectData, DialogInputs, sortData} from './formHelpers';

function getCurrentModalData(CurrentModalData) {
    return _.pick(CurrentModalData, ['name', 'teacher', 'substitute']);
}

function RoomDialog({t, classData, classModalData, actions}) {
    const cleanData = sortData(classData);
    const {id, showModal, isInvalid} = classModalData;
    const selectedRoom = isInvalid ? getCurrentModalData(classModalData) : filterObjectData(cleanData, id);
    const roomInputs = DialogInputs(t, selectedRoom, isInvalid);
    const hiddenInput = <input type='hidden' name='oldName' data-id={selectedRoom.name} />;

    const footerData = {
        dataId:       id,
        nameId:       null,
        closeId:      id,
        deleteAction: actions.deleteRoom,
        closeAction:  actions.roomModalDisplay
    };

    return (
        <div>
            {DialogFrame(t, showModal, actions.updateRoom, roomInputs, hiddenInput, footerData)}
        </div>
    );
}

const mapStateToProps = state => ({
    classModalData: state.classModalData,
    classData:      state.classData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(RoomDialog));
