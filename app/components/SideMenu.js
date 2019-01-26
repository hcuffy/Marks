import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { actionCreators } from '../actions/index'

import { HOME, SCHOOL, CLASSROOM, STUDENTS, GRADES } from '../constants/routes.json'
import styles from './styles/sidemenu.css'

const SideMenu = ({ menuStyle, actions }) => (
	<div className={styles.menu_div}>
		<button type="button" className={styles.menu_btn}>
			<Link onClick={actions.updateButtonStyle} to={HOME}>
				<i
					data-id="home"
					style={{ color: menuStyle.home }}
					className="fa fa-home fa-3x"
				/>
			</Link>
		</button>
		<button type="button" className={styles.menu_btn}>
			<Link onClick={actions.updateButtonStyle} to={SCHOOL}>
				<i
					data-id="school"
					style={{ color: menuStyle.school }}
					className="fa fa-school fa-3x"
				/>
			</Link>
		</button>
		<button type="button" className={styles.menu_btn}>
			<Link onClick={actions.updateButtonStyle} to={CLASSROOM}>
				<i
					data-id="classroom"
					style={{ color: menuStyle.classroom }}
					className="fa fa-eraser fa-3x"
				/>
			</Link>
		</button>
		<button type="button" className={styles.menu_btn}>
			<Link onClick={actions.updateButtonStyle} to={STUDENTS}>
				<i
					data-id="students"
					style={{ color: menuStyle.students }}
					className="fa fa-users fa-3x"
				/>
			</Link>
		</button>
		<button type="button" className={styles.menu_btn}>
			<Link onClick={actions.updateButtonStyle} to={GRADES}>
				<i
					data-id="exams"
					style={{ color: menuStyle.exams }}
					className="fa fa-list-ol fa-3x"
				/>
			</Link>
		</button>
		<ToastContainer />
	</div>
)

const mapStateToProps = state => ({ menuStyle: state.menuStyle })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SideMenu)
