import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/classroom.css'

const NavBar = ({ tabStatus, actions }) => (
	<div className={styles.navbar_div}>
		<ul className="nav nav-pills justify-content-center">
			<li className="nav-item">
				<a
					role="button"
					tabIndex={0}
					className={`nav-link ${tabStatus.subjectClass}`}
					onClick={actions.changeClassroomTab}
				>
					{tabStatus.tabOneTitle}
				</a>
			</li>
			<li className="nav-item">
				<a
					role="button"
					tabIndex={-1}
					className={`nav-link ${tabStatus.testClass}`}
					onClick={actions.changeClassroomTab}
				>
					{tabStatus.tabTwoTitle}
				</a>
			</li>
		</ul>
	</div>
)

const mapStateToProps = state => ({ tabStatus: state.tabStatus })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavBar)
