import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { actionCreators } from '../../actions/index'
import { Button } from 'reactstrap'
import { menuData } from './helpers/sideMenuData'
import css from './styles/sidemenu.css'

const _ = require('lodash')

const SideMenu = ({ menuStylingData, actions }) => {
	const menuItems = _.keys(menuData).map((data, idx) => (
		<Button key={idx} className={css.menu_btn}>
			<Link onClick={actions.updateButtonStyle} to={menuData[data].linkTo}>
				<i
					data-id={menuData[data].dataId}
					style={{ color: menuStylingData[menuData[data].dataId] }}
					className={menuData[data].className}
				/>
			</Link>
		</Button>
	))

	return (
		<div className={css.menu_div}>
			{menuItems}

			<ToastContainer />

			<h6 className={css.version}>ver. 1.3.1</h6>
		</div>
	)
}

const mapStateToProps = state => ({ menuStylingData: state.menuStylingData })

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
