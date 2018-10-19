// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/schoolData.css'

const SchoolPage = ({ schoolData, actions }) => (
  <div className={styles.school_data_div}>
    <p>Display Test</p>
    <span>{schoolData.title}</span>
    <br />
    <span>{schoolData.street}</span>
    <br />
    <span>{schoolData.schoolstate}</span>
    <br />
    <span>{schoolData.country}</span>
    <br />
    <span>{schoolData.year}</span>
  </div>
)

const mapStateToProps = state => ({
  schoolData: state.schoolData
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolPage)
