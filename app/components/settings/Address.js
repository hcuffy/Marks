import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { t } from '../../utils/translationUtil'
import { addressForm, addressFields } from './helpers/formHelpers'
import { actionCreators } from '../../actions/index'
import styles from './styles/settings.css'

const Address = ({ schoolData, actions }) => {
	const entry = addressFields(schoolData)

	return (
		<div className={styles.address_wrapper}>
			<h4 className={styles.center_header}>{t('settings.addressTitle')}</h4>
			{addressForm(entry, actions)}
		</div>
	)
}
const mapStateToProps = state => ({ schoolData: state.schoolData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Address)
