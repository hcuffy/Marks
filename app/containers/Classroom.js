// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import SideMenu from '../components/SideMenu'
import NavBar from '../components/NavBar'
import Classes from '../components/Classes'
import Exam from '../components/Exam'

class Classroom extends Component {
  componentDidMount() {
    if (this.props.allClassData) {
      this.props.actions.displayClassData()
    }
  }

  render() {
    return (
      <div data-tid="classroom_container">
        <SideMenu />
        <NavBar />
        {this.props.classesActive && <Classes />}
        {this.props.examActive && <Exam />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  classesActive: state.tabStatus.classTab,
  examActive: state.tabStatus.testTab,
  allClassData: state.allClassData
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classroom)
