// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './styles/Home.css';
import SideMenu from './SideMenu';
import { generalSuccess } from './notifications/General';
import {ToastContainer, ToastStore} from 'react-toasts';
let test = true;
type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <SideMenu/>
        <button onClick={() => ToastStore.error("error test")}>test</button>
        <ToastContainer store={ToastStore}/>
      </div>
    );
  }
}
