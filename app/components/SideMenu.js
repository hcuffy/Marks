import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../actions/index';
import routes from '../constants/routes.json';
import styles from './styles/SideMenu.css';

const SideMenu = () => (

    <div className={styles.menu_div}>
      <Link to={routes.SCHOOL}><i className="fa fa-school fa-3x"/></Link>
      <i className="fa fa-users fa-3x" />
      <i className="fa fa-eraser fa-3x" />
      <i className="fa fa-list-ol fa-3x" />
    </div>
  );

const mapStateToProps = (state) => ({
    })

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actionCreators, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
