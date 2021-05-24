import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Icon} from '@blueprintjs/core';

import {updateButtonStyle} from './actions';
import {menuData} from './sideMenuData';
import {openResource} from '../../utils';
import {RELEASE_LINK} from './constants';
import css from './style.css';

function SidemenuComponent({menuStylingData, updateButtonStyle}) {
    const menuItems = _.keys(menuData).map((data, idx) => (
        <Link key={idx} to={menuData[data].linkTo}>
            <Button outlined={true} className={css.menu_btn} data-id={menuData[data].dataId} onClick={updateButtonStyle}>
                <Icon
                    icon={menuData[data].name}
                    iconSize={40}
                    color={menuStylingData[menuData[data].dataId]}
                />

            </Button>
        </Link>
    ));

    return (
        <div className={css.menu_div}>
            {menuItems}

            <Button
                onClick={openResource}
                className={css.version}
                data-name={RELEASE_LINK}
                text={'ver. 1.5.0'}
            />
        </div>
    );
}

const mapStateToProps = state => ({menuStylingData: state.menuStylingData});

const mapDispatchToProps = {updateButtonStyle};

export default connect(mapStateToProps, mapDispatchToProps)(SidemenuComponent);
