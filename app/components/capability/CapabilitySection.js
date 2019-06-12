import React from 'react'
import { withNamespaces } from 'react-i18next'
import CapabilityDropdown from './CapabilityDropdown'
import styles from './styles/capability.css'

const CapabilitySection = () => (
	<div className={styles.capability_wrapper}>
		<h4 className={styles.main_header}>COMPATIBILITY</h4>
		<CapabilityDropdown />
	</div>
)

export default CapabilitySection
