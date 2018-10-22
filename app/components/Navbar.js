// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'

const NavBar = ({ tabStatus, actions }) => (
  <div>
    <ul className="nav nav-pills justify-content-center">
      <li className="nav-item">
        <a className="nav-link active" onClick={actions.changeClassroomTab}>
          subs
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={actions.changeClassroomTab}>
          Tests
        </a>
      </li>
    </ul>
  </div>
)

const mapStateToProps = state => {
  console.log(state)
  return { tabStatus: state.tabStatus }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
