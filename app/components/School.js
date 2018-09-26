import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { actionCreators } from '../actions/index';
import SideMenu from './SideMenu';

const School = () => (

    <div className="form-wrapper">
      <SideMenu/>
        <form method="POST" >
        <h2>School</h2>
          <input name="title" type="text" placeholder="Enter your school's name."/>
          <input name="street" type="text" placeholder="Enter the street."/>
          <input name="state" type="text" placeholder="Enter the state."/>
          <input name="country" type="text" placeholder="Enter the country."/>
          <input name="year" type="number" min="2000" max="2050" placeholder="Enter the country."/>
          <button className="custom-btn">Login</button>
        </form>
    </div>
  );

const mapStateToProps = (state) => ({
    })

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actionCreators, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(School);
