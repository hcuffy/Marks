// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import routes from '../constants/routes.json'
import { actionCreators } from '../actions/index'
import styles from './styles/Home.css'
import SideMenu from './SideMenu'
import SchoolInfo from './SchoolInfo'

class Home extends Component {
  componentWillMount() {
    this.props.actions.handleSchoolDataDisplay()
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <SideMenu />
        <SchoolInfo />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  schoolData: state.schoolData
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
