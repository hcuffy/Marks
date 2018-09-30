// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './styles/Home.css';
import SideMenu from './SideMenu';
import {generalSuccess} from './notifications/General';
import { toast } from 'react-toastify';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <SideMenu/>
        <button onClick={generalSuccess()}>test</button>

      </div>
    );
  }
}
