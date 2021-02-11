import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import {DialogFrame, DialogInputs} from '../helpers';
import {filterObjectData} from './formHelpers';

function getCurrentModalData(CurrentModalData) {
    return _.pick(CurrentModalData, ['name', 'teacher', 'substitute']);
}

function RoomDialog({t, classData, classModalData, actions}) {
    const {id, showDialog, isInvalid} = classModalData;
    const selection = isInvalid ? getCurrentModalData(classModalData) : filterObjectData(classData, id);
    const roomInputs = <DialogInputs t={t} selection={selection} isInvalid={isInvalid} label={'room'}/>;
    const hiddenInput = <input type='hidden' name='oldName' data-id={selection.name} />;
    const {showRoomDialog, deleteRoom} = actions;
    const footerData = {dataId: id, nameId: null, closeId: id, deleteAction: deleteRoom};

    return (
        <div>
            {DialogFrame(t, showDialog, actions.updateRoom, roomInputs, hiddenInput, footerData, showRoomDialog)}
        </div>
    );
}

const mapStateToProps = state => ({
    classModalData: state.classModalData,
    classData:      state.classData?.classData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(RoomDialog));
