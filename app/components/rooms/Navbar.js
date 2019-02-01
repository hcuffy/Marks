import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/room.css'

const classPill = (index, pillClass, action, title) => (
	<li className="nav-item">
		<a
			role="button"
			tabIndex={index}
			className={`nav-link ${pillClass}`}
			onClick={action}
		>
			{title}
		</a>
	</li>
)

const NavBar = ({ tabChangeData, actions }) => (
	<div className={styles.navbar_div}>
		<ul className="nav nav-pills justify-content-center">
			{classPill(
				0,
				tabChangeData.subjectClass,
				actions.changeClassroomTab,
				tabChangeData.tabOneTitle
			)}
			{classPill(
				-1,
				tabChangeData.testClass,
				actions.changeClassroomTab,
				tabChangeData.tabTwoTitle
			)}
		</ul>
	</div>
)

const mapStateToProps = state => ({ tabChangeData: state.tabChangeData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavBar)
