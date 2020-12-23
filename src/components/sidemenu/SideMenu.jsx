import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import {Button} from 'reactstrap';

import {actionCreators} from '../../actions/index';
import {menuData} from './sideMenuData';
import {openResource} from '../../utils';
import {RELEASE_LINK} from './constants';
import css from './styles/sidemenu.css';

function SideMenu({menuStylingData, actions}) {
    const menuItems = _.keys(menuData).map((data, idx) => (
        <Button key={idx} className={css.menu_btn}>
            <Link onClick={actions.updateButtonStyle} to={menuData[data].linkTo}>
                <i
                    data-id={menuData[data].dataId}
                    style={{color: menuStylingData[menuData[data].dataId]}}
                    className={menuData[data].className}
                />
            </Link>
        </Button>
    ));

    return (
        <div className={css.menu_div}>
            {menuItems}

            <ToastContainer />

            <Button
                onClick={openResource}
                className={css.version}
                data-name={RELEASE_LINK}
            >
				ver. 1.3.2 <i className='fas fa-external-link-square-alt' />
            </Button>
        </div>
    );
}

const mapStateToProps = state => ({menuStylingData: state.menuStylingData});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
