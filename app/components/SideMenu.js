// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { actionCreators } from '../actions/index'
import { HOME, SCHOOL, CLASSROOM } from '../constants/routes.json'
import styles from './styles/sideMenu.css'

const SideMenu = () => (
	<div className={styles.menu_div}>
		<button type="button" className={styles.menu_btn}>
			<Link to={HOME}>
				<i className="fa fa-home fa-3x" />
			</Link>
		</button>
		<button type="button" className={styles.menu_btn}>
			<Link to={SCHOOL}>
				<i className="fa fa-school fa-3x" />
			</Link>
		</button>
		<button type="button" className={styles.menu_btn}>
			<Link to={CLASSROOM}>
				<i className="fa fa-eraser fa-3x" />
			</Link>
		</button>
		<button type="button" className={styles.menu_btn}>
			<i className="fa fa-users fa-3x" />
		</button>
		<button type="button" className={styles.menu_btn}>
			<i className="fa fa-list-ol fa-3x" />
		</button>
		<ToastContainer />
	</div>
)

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(SideMenu)
