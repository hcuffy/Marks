// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import routes from '../constants/routes.json'
import SideMenu from '../components/SideMenu'
import SchoolInfo from '../components/SchoolInfo'

class Home extends Component {
  componentDidMount() {
    this.props.actions.displaySchoolData()
  }

  render() {
    return (
      <div data-tid="container">
        <SideMenu />
        <SchoolInfo />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(Home)
