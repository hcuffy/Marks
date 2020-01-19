import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { modalFrame } from '../helpers/editModal'
import { cleanAndFilterData, createModalInputs } from './helpers/formHelpers'

const RoomModal = ({ t, modalData, classModalData, actions }) => {
	const selectedRoom = cleanAndFilterData(modalData, classModalData)
	const clickedRoom = createModalInputs(t, selectedRoom)
	const hiddenInput = <input type="hidden" name="oldName" data-id={selectedRoom.name} />
	const footerData = {
		dataId: classModalData.id,
		nameId: null,
		closeId: classModalData.id,
		deleteAction: actions.deleteRoom,
		closeAction: actions.roomModalDisplay
	}

	return <div>{modalFrame(t, classModalData.showModal, actions.updateRoom, clickedRoom, hiddenInput, footerData)}</div>
}

const mapStateToProps = state => ({ classModalData: state.classModalData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(RoomModal))
