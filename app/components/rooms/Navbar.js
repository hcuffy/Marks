import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withNamespaces } from 'react-i18next'
import { actionCreators } from '../../actions/index'
import { classPill } from './helpers/formHelpers'
import styles from './styles/room.css'

const _ = require('lodash')

const NavBar = ({ t, tabChangeData, actions }) => {
	const { classTab, examTab } = tabChangeData

	return (
		<div className={styles.navbar_div}>
			<h4 className={styles.center_main_header}>{t('room.title')}</h4>
			<ul className="nav nav-pills justify-content-center">
				{classPill(
					0,
					classTab,
					_.keys({ classTab })[0],
					actions.changeClassroomTab,
					t('room.classTab')
				)}
				{classPill(
					-1,
					examTab,
					_.keys({ examTab })[0],
					actions.changeClassroomTab,
					t('room.examsTab')
				)}
			</ul>
		</div>
	)
}

const mapStateToProps = state => ({ tabChangeData: state.tabChangeData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNamespaces()(NavBar))
