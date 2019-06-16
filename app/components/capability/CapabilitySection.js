import React from 'react'

import CapabilityDropdown from './CapabilityDropdown'
import styles from './styles/capability.css'

const CapabilitySection = () => (
	<div className={styles.capability_wrapper}>
		<h4 className={styles.main_header}>CAPABILITY</h4>
		<CapabilityDropdown />
	</div>
)

export default CapabilitySection
