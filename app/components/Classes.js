// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/classroom.css'

const _ = require('lodash')

const Classes = ({ classData, actions }) => {
  const form_inputs = _.keys(classData).map((data, idx) => (
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
        <p>Test</p>
        <div className="list-group list-group-flush">
          <button
            type="button"
            className="list-group-item list-group-item-action active"
          >
            Cras justo odio
          </button>
          <button
            type="button"
            className="list-group-item list-group-item-action active"
          >
            Dapibus ac facilisis in
            <span className="badge badge-warning badge-pill">14</span>
          </button>
          <button
            type="button"
            className="list-group-item list-group-item-action"
          >
            Morbi leo risus
          </button>
          <button
            type="button"
            className="list-group-item list-group-item-action"
          >
            Porta ac consectetur ac
          </button>
          <button
            type="button"
            className="list-group-item list-group-item-action"
            style={{ height: `${30}px` }}
          >
            Vestibulum at eros
          </button>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => ({ classData: state.classData })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classes)
