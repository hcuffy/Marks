import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { actionCreators } from '../actions/index';
import routes from '../constants/routes.json';
import { Link } from 'react-router-dom';

const School = () => (

    <div className="form-wrapper">
      <Link to={routes.HOME}>  <i className="fa fa-arrow-left fa-3x" /></Link>
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
