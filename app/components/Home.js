// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './styles/Home.css';
import {ToastContainer, ToastStore} from 'react-toasts';
import SideMenu from './SideMenu';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <SideMenu/>
          <button onClick={() => ToastStore.error("There is an error :'(")}>Click me !</button>
          <ToastContainer position={ToastContainer.POSITION.TOP_RIGHT} store={ToastStore}/>
      </div>
    );
  }
}
