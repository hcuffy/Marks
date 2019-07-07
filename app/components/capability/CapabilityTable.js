import React from 'react'
import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import tableForm from './helpers/tableForm'
import styles from './styles/capability.css'

const CapabilityTable = ({ t, capabilityData }) => {
	const { answers, classroomId } = capabilityData

	return <div className={styles.table_main_dev}>{tableForm(t, classroomId, answers)}</div>
}

const mapStateToProps = state => ({
	capabilityData: state.capabilityData
})

export default connect(
	mapStateToProps,
	null
)(withNamespaces()(CapabilityTable))
