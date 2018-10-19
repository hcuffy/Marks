// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/home.css'
import SideMenu from './SideMenu'
import SchoolInfo from './SchoolInfo'

const School = ({ schoolData, actions }) => (
  <div className={styles.div_wrapper}>
    <h2 className={styles.center_header}>School Information</h2>
    <SideMenu />
    <form onSubmit={actions.handleSchoolData} method="POST">
      <div className={styles.form_outer_div}>
        <div className={styles.form_inner_div}>
          <label htmlFor="school_name">School Name:</label>
          <input
            name="title"
            id="school_name"
            type="text"
            defaultValue={schoolData.title}
          />
        </div>
        <div className={styles.form_inner_div}>
          <label htmlFor="school_street">Address:</label>
          <input
            name="street"
            id="school_street"
            type="text"
            defaultValue={schoolData.street}
          />
        </div>
        <div className={styles.form_inner_div}>
          <label htmlFor="school_state">State:</label>
          <input
            name="state"
            id="school_state"
            type="text"
            defaultValue={schoolData.state}
          />
        </div>
        <div className={styles.form_inner_div}>
          <label htmlFor="school_country">Country:</label>
          <input
            name="country"
            id="school_country"
            type="text"
            defaultValue={schoolData.country}
          />
        </div>
        <div className={styles.form_inner_div}>
          <label htmlFor="school_zip">Zip Code:</label>
          <input
            name="zip"
            id="school_zip"
            type="text"
            defaultValue={schoolData.zip}
          />
        </div>
        <div className={styles.form_inner_div}>
          <label htmlFor="school_year">Year:</label>
          <input
            name="year"
            id="school_year"
            type="text"
            defaultValue={schoolData.year}
          />
        </div>
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

const mapStateToProps = state => ({ schoolData: state.schoolData })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(School)
