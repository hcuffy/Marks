import React from 'react'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import tableForm from './helpers/tableForm'
import styles from './styles/capability.css'

const CapabilityTable = ({ t, capabilityData, actions }) => (
	<div className={styles.table_main_dev}>{tableForm(t, capabilityData, actions)}</div>
)

const mapStateToProps = state => ({
	capabilityData: state.capabilityData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(CapabilityTable))
