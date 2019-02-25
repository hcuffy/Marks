import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { actionCreators } from '../../actions/index'
import { menuData } from './helpers/sideMenuData'
import styles from './styles/sidemenu.css'

const _ = require('lodash')

const SideMenu = ({ menuStylingData, actions }) => {
	const menuItems = _.keys(menuData).map((data, idx) => (
		<button key={idx} type="button" className={styles.menu_btn}>
			<Link onClick={actions.updateButtonStyle} to={menuData[data].linkTo}>
				<i
					data-id={menuData[data].dataId}
					style={{ color: menuStylingData[menuData[data].dataId] }}
					className={menuData[data].className}
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
