import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { addressForm, addressFields } from './helpers/formHelpers'
import { actionCreators } from '../../actions/index'
import styles from './styles/settings.css'

const Address = ({ t, addressData, actions }) => {
	const entry = addressFields(t, addressData)

	return (
		<div className={styles.address_wrapper}>
			<h4 className={styles.address_header}>{t('settings.addressTitle')}</h4>
			{addressForm(t, entry, actions)}
		</div>
	)
}
const mapStateToProps = state => ({ addressData: state.addressData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(Address))
