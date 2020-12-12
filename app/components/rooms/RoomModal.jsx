import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../actions/index';
import {modalFrame} from '../helpers/editModal';
import {filterObjectData, createModalInputs} from './helpers/formHelpers';

const getCurrentModalData = CurrentModalData => {
    return _.pick(CurrentModalData, ['name', 'teacher', 'substitute']);
};

const RoomModal = ({t, modalData, classModalData, actions}) => {
    const {id, showModal, isInvalid} = classModalData;

    const selectedRoom = isInvalid
        ? getCurrentModalData(classModalData)
        : filterObjectData(modalData, id);

    const roomInputs = createModalInputs(t, selectedRoom, isInvalid);

    const hiddenInput =
		<input type='hidden' name='oldName' data-id={selectedRoom.name} />;

    const footerData = {
        dataId:       id,
        nameId:       null,
        closeId:      id,
        deleteAction: actions.deleteRoom,
        closeAction:  actions.roomModalDisplay
    };

    return (
        <div>
            {modalFrame(
                t,
                showModal,
                actions.updateRoom,
                roomInputs,
                hiddenInput,
                footerData
            )}
        </div>
    );
};

const mapStateToProps = state => ({classModalData: state.classModalData});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(RoomModal));
