// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/SideMenu'
import NavBar from '../components/NavBar'
import Classes from '../components/Classes'

class Classroom extends Component {
  render() {
    return (
      <div data-tid="classroom_container">
        <SideMenu />
        <NavBar />
        <Classes />
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
)(Classroom)
