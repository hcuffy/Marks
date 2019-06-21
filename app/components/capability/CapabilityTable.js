import React from 'react'
import { connect } from 'react-redux'
import tableForm from './helpers/tableForm'
import styles from './styles/capability.css'

const CapabilityTable = () => <div className={styles.table_main_dev}>{tableForm()}</div>

export default connect(
	null,
	null
)(CapabilityTable)
