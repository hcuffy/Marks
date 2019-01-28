import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { actionCreators } from '../../actions/index'
import { MENUDATA } from './helpers/sideMenuData'
import styles from './styles/sidemenu.css'

const _ = require('lodash')

const SideMenu = ({ menuStylingData, actions }) => {
	const menuItems = _.keys(MENUDATA).map((data, idx) => (
		<button key={idx} type="button" className={styles.menu_btn}>
			<Link onClick={actions.updateButtonStyle} to={MENUDATA[data].linkTo}>
				<i
					data-id={MENUDATA[data].dataId}
					style={{ color: menuStylingData[MENUDATA[data].dataId] }}
					className={MENUDATA[data].className}
				/>
			</Link>
		</button>
	))
	return (
		<div className={styles.menu_div}>
			{menuItems}
			<ToastContainer />
		</div>
	)
}

const mapStateToProps = state => ({ menuStylingData: state.menuStylingData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SideMenu)
