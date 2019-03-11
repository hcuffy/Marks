import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { t } from '../../utils/translationUtil'
import { actionCreators } from '../../actions/index'
import { resourceList } from './helpers/resourcesList'
import styles from './styles/homepage.css'

const _ = require('lodash')

const Homepage = ({ addressData, actions }) => {
	const entry = _.values(addressData).map((data, idx) => <li key={idx}>{data}</li>)

	return (
		<div className={styles.main_school_div}>
			<h4 className={styles.main_header}> {t('home.title')}</h4>
			<div className={styles.school_left_div}>
				<div>
					<p>{t('home.addressHeader')}</p>
					<span>{entry}</span>
				</div>
			</div>

			<div className={styles.school_right_div}>
				<div>
					<p>{t('home.resourcesHeader')}</p>
					{resourceList(actions)}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	addressData: state.addressData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Homepage)
