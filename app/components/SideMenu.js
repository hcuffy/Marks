// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { HOME, SCHOOL } from '../constants/routes.json';
import styles from './styles/SideMenu.css';
import { ToastContainer } from 'react-toastify';

const SideMenu = () => (

    <div className={styles.menu_div}>
      <button className={styles.menu_btn} ><Link to={HOME}><i className={"fa fa-home fa-3x"}/></Link></button>
      <button className={styles.menu_btn} ><Link to={SCHOOL}><i className={"fa fa-school fa-3x"}/></Link></button>
      <button className={styles.menu_btn} ><i className= "fa fa-users fa-3x"/></button>
      <button className={styles.menu_btn} ><i className="fa fa-eraser fa-3x"/></button>
      <button className={styles.menu_btn} ><i className="fa fa-list-ol fa-3x"/></button>
      <ToastContainer />
    </div>
  );

export default SideMenu;
