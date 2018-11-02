// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/list.css'

const _ = require('lodash')

function cleanAndSortData(clean) {
  const requiredProp = _.pick(clean, ['classData'])
  const sortedProp = _.sortBy(requiredProp.classData, ['Name'], ['asc'])

  return sortedProp
}

const List = ({ listData, actions }) => {
  const cleanedData = cleanAndSortData(listData)
  const list_inputs = cleanedData.map((data, idx) => (
    <button
      key={idx}
      id={data._id}
      type="button"
      className={`list-group-item list-group-item-action ${styles.list_btn}`}
    >
      {data.Name}
      <span className={`badge badge-warning badge-pill ${styles.badge_number}`}>
        {data.Subjects.length}
      </span>
    </button>
  ))
  return (
    <div className={styles.list_div}>
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
