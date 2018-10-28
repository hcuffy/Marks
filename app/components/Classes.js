// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/classroom.css'

const Classes = () => (
  <div className={styles.room_div}>
    <form method="POST">
      <div className={styles.form_outer_div}>
        <div className={styles.form_div}>
          <label className={styles.form_label} htmlFor="classId">
            Class Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="classId"
            name="Name"
            defaultValue="test"
          />
        </div>
        <div className={styles.form_div}>
          <label className={styles.form_label} htmlFor="classTeacher">
            Class Teacher:
          </label>
          <input
            type="text"
            className="form-control"
            id="classTeacher"
            name="Teacher"
            defaultValue="test"
          />
        </div>
        <div className={styles.form_div}>
          <label className={styles.form_label} htmlFor="classCode">
            Class Code:
          </label>
          <input
            type="text"
            className="form-control"
            id="classCode"
            name="Code"
            defaultValue="test"
          />
        </div>
        <div className={styles.form_div}>
          <label className={styles.form_label} htmlFor="subjectTeacher">
            Subject Teacher:
          </label>
          <input
            type="text"
            className="form-control"
            id="subjectTeacher"
            name="Subject_Teacher"
            defaultValue="test"
          />
        </div>
        <div className={(styles.form_div, styles.save_btn)}>
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </form>
    <div>
      <p>Test</p>
    </div>
  </div>
)

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classes)
