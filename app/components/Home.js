// @flow
import React, { Component } from 'react';
import routes from '../constants/routes.json';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { actionCreators } from '../actions/index';
import styles from './styles/Home.css';
import SideMenu from './SideMenu';
import SchoolInfo from './SchoolInfo';
import { getSchoolData } from '../database/schoolDB';
import { handleSchoolDataDisplay } from '../actions/schoolAction'

const initialLoadState = {
  'title':'Initial',
  'street':'Initial',
  'state':'Initial',
  'country':'Initial',
  'year':'Initial'
}

class Home extends Component {

  componentWillMount () {
     this.props.actions.handleSchoolDataDisplay()
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


const mapStateToProps = (state) => ({
    })

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actionCreators, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(Home);
