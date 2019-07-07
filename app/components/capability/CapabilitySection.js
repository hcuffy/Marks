import React from 'react'
import { withNamespaces } from 'react-i18next'
import CapabilityDropdown from './CapabilityDropdown'
import CapabilityTable from './CapabilityTable'
import styles from './styles/capability.css'

const CapabilitySection = ({ t }) => (
	<div className={styles.capability_wrapper}>
		<h4 className={styles.main_header}>CAPABILITY</h4>
		<CapabilityDropdown />
		<CapabilityTable t={t} />
	</div>
)

export default withNamespaces()(CapabilitySection)
