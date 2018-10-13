// @flow
import React, { Component } from 'react';
import routes from '../constants/routes.json';
import styles from './styles/Home.css';
import SideMenu from './SideMenu';
import SchoolInfo from './SchoolInfo';

export default class Home extends Component {

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <SideMenu/>
        <SchoolInfo/>

      </div>
    );
  }
}
