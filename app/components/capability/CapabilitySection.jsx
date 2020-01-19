import React from 'react'
import { withNamespaces } from 'react-i18next'
import CapabilityDropdown from './CapabilityDropdown'
import CapabilityTable from './CapabilityTable'
import css from './styles/capability.css'

const CapabilitySection = ({ t }) => (

	<div className={css.capability_wrapper}>
		<h4 className={css.main_header}>CAPABILITY</h4>
		<CapabilityDropdown t={t} />
		<CapabilityTable t={t} />
	</div>
)

export default withNamespaces()(CapabilitySection)
