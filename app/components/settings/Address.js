import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { t } from '../../utils/translationUtil'
import { addressForm, addressFields } from './helpers/formHelpers'
import { actionCreators } from '../../actions/index'
import styles from './styles/settings.css'

const Address = ({ addressData, actions }) => {
	const entry = addressFields(addressData)

	return (
		<div className={styles.address_wrapper}>
			<h4 className={styles.center_header}>{t('settings.addressTitle')}</h4>
			{addressForm(entry, actions)}
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
)(Address)
