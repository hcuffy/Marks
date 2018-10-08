// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './styles/Home.css';
import SideMenu from './SideMenu';
import SchoolInfo from './SchoolData';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;


  render() {
    return (
      <div className={styles.container} data-tid="container">
        <SideMenu/>
        <SchoolInfo/>
      </div>
    );
  }
}
