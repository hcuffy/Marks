// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/home.css'

const _ = require('lodash')

const SchoolInfo = ({ schoolData, actions }) => {
  const entry = _.keys(schoolData).map((data, idx) => (
    <div key={idx} className={styles.form_inner_div}>
      <label className={styles.form_label} htmlFor={`school${data}`}>
        School {data}:
      </label>
      <input
        name={data}
        className="form-control"
        id={`school${data}`}
        type="text"
        defaultValue={schoolData[data]}
      />
    </div>
  ))

  return (
    <div className={styles.div_wrapper}>
      <h2 className={styles.center_header}>School Information</h2>
      <form onSubmit={actions.handleSchoolData} method="POST">
        <div className={styles.form_outer_div}>
          {entry}
          <div className={(styles.form_inner_div, styles.save_btn)}>
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </div>
      </form>
      <div />
    </div>
  )
}
const mapStateToProps = state => ({ schoolData: state.schoolData })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolInfo)
