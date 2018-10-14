// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { actionCreators } from '../actions/index';
import styles from './styles/Home.css';
import SideMenu from './SideMenu';
import SchoolInfo from './SchoolInfo';

const School = ({actions}) => (

    <div className="form-wrapper">
      <h2 className={styles.center_header}>School Information</h2>
      <SideMenu/>
      <SchoolInfo/>
        <form onSubmit={actions.handleSchoolData} method="POST" method="POST" >
          <input name="title" type="text" placeholder="Enter your school's name."/>
          <input name="street" type="text" placeholder="Enter the street."/>
          <input name="state" type="text" placeholder="Enter the state."/>
          <input name="country" type="text" placeholder="Enter the country."/>
          <button className="custom-btn">Save</button>
        </form>

    </div>
  );

const mapStateToProps = (state) => ({
    })

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actionCreators, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(School);
