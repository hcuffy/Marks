import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {updateRoom, showRoomDialog, deleteRoom} from './actions';
import {DialogFrame, DialogInputs} from '../helpers';
import {filterObjectData} from './formHelpers';

function getCurrentModalData(CurrentModalData) {
    return _.pick(CurrentModalData, ['name', 'teacher', 'substitute']);
}

function RoomDialog({t, classData, classDialogData, updateRoom, showRoomDialog, deleteRoom}) {
    const {id, showDialog, isInvalid} = classDialogData;
    const selection = isInvalid ? getCurrentModalData(classDialogData) : filterObjectData(classData, id);
    const roomInputs = <DialogInputs t={t} selection={selection} isInvalid={isInvalid} label={'room'}/>;
    const hiddenInput = <input type='hidden' name='oldName' data-id={selection.name} />;
    const footerData = {dataId: id, nameId: null, closeId: id, deleteAction: deleteRoom};

    return (
        <div>
            {DialogFrame(t, showDialog, updateRoom, roomInputs, hiddenInput, footerData, showRoomDialog)}
        </div>
    );
}

const mapStateToProps = state => ({
    classDialogData: state.classDialogData,
    classData:       state.classData?.classData
});

const mapDispatchToProps = {updateRoom, showRoomDialog, deleteRoom};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(RoomDialog));
