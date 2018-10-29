// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/list.css'

const _ = require('lodash')

const List = ({ listData, actions }) => {
  const selectedProp = _.pick(listData, ['allClassData'])
  console.log(selectedProp)
  const list_inputs = _.keys(selectedProp.allClassData).map((data, idx) => (
    <button
      key={idx}
      type="button"
      className={`list-group-item list-group-item-action ${styles.list_btn}`}
    >
      {data}
      <span className="badge badge-warning badge-pill">14</span>
    </button>
  ))
  return (
    <div>
      <h4 className={styles.center_header}>List of Classes</h4>
      <div className="list-group list-group-flush">{list_inputs}</div>
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(List)
