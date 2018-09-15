import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { actionCreators } from '../actions/index';
import routes from '../constants/routes.json';
import { Link } from 'react-router-dom';
import SideMenu from './SideMenu';

const School = () => (

    <div className="form-wrapper">
      <SideMenu/>
        <form method="POST" >
        <h2>School</h2>
          <input name="email" type="text" placeholder="Enter your email"/>
          <input name="password" type="password" placeholder="Enter your password"/>
          <button className="custom-btn">Login</button>
        </form>

        <span className="register">Register</span>
    </div>
  );

const mapStateToProps = (state) => ({
    })

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actionCreators, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(School);
