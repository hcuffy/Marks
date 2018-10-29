// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/classroom.css'
import List from './List'

const _ = require('lodash')

const Classes = ({ allClassData, actions }) => {
  const removedAProp = _.omit(allClassData, ['allClassData'])
  const form_inputs = _.keys(removedAProp).map((data, idx) => (
    <div key={idx} className={styles.form_div}>
      <label className={styles.form_label} htmlFor={`${data}Id`}>
        {data}:
      </label>
      <input
        name={data}
        className="form-control"
        id={`${data}Id`}
        type="text"
      />
    </div>
  ))

  return (
    <div className={styles.room_div}>
      <form onSubmit={actions.handleClassData} method="POST">
        <div className={styles.form_outer_div}>
          <h4 className={styles.center_header}>Add a Class</h4>
          {form_inputs}
          <div className={(styles.form_div, styles.save_btn)}>
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
        </div>
      </form>
      <div>
        <List listData={allClassData} />
      </div>
    </div>
  )
}
const mapStateToProps = state => ({
  allClassData: state.allClassData
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classes)
