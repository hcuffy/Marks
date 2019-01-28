import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/room.css'

const NavBar = ({ tabChangeData, actions }) => (
	<div className={styles.navbar_div}>
		<ul className="nav nav-pills justify-content-center">
			<li className="nav-item">
				<a
					role="button"
					tabIndex={0}
					className={`nav-link ${tabChangeData.subjectClass}`}
					onClick={actions.changeClassroomTab}
				>
					{tabChangeData.tabOneTitle}
				</a>
			</li>
			<li className="nav-item">
				<a
					role="button"
					tabIndex={-1}
					className={`nav-link ${tabChangeData.testClass}`}
					onClick={actions.changeClassroomTab}
				>
					{tabChangeData.tabTwoTitle}
				</a>
			</li>
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
