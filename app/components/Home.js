// @flow
import React, { Component } from 'react';
import routes from '../constants/routes.json';
import styles from './styles/Home.css';
import SideMenu from './SideMenu';
import SchoolInfo from './SchoolInfo';
import {getSchoolData } from '../database/schoolDB';

export default class Home extends Component {
  componentDidMount() {
    async (dispatch) => {
      const data = await getSchoolData()
        dispatch({
          type: HANDLE_SCHOOL_DATA_DISPLAY,
          payload: {schoolData: data}
        })
    }
    }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <SideMenu/>
        <SchoolInfo/>

      </div>
    );
  };
};
