// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { actionCreators } from '../actions/index';
import SideMenu from '../components/SideMenu';

export class School extends Component {
  constructor(props) {
    super(props)
        this.state = {
          title: '',
          street: '',
          state: '',
          country: ''
        };

      this.handleForm = this.handleForm.bind(this);
    }

handleForm(event) {
  event.preventDefault();

  const formData = {
    title: event.target.title.value,
    street: event.target.street.value,
    state: event.target.state.value,

    country: event.target.country.value
  }
    actions.handleSchoolData(formData)
}

  render() {
    return (
      <div className="form-wrapper">
        <SideMenu/>
          <form onSubmit={this.handleForm} method="POST" >
          <h2>School Information</h2>
            <input name="title" type="text" placeholder="Enter your school's name."/>
            <input name="street" type="text" placeholder="Enter the street."/>
            <input name="state" type="text" placeholder="Enter the state."/>
            <input name="country" type="text" placeholder="Enter the country."/>
            <button className="custom-btn">Save</button>
          </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    school : state.title
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(School);
