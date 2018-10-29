// @flow
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../actions/index'
import styles from './styles/list.css'

const _ = require('lodash')

const List = ({ listData, actions }) => (
  <div>
    <h4 className={styles.center_header}>List of Classes</h4>
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
      <button type="button" className="list-group-item list-group-item-action">
        Morbi leo risus
      </button>
      <button type="button" className="list-group-item list-group-item-action">
        Porta ac consectetur ac
      </button>
      <button
        type="button"
        className={`list-group-item list-group-item-action ${styles.list_btn}`}
      >
        Vestibulum at eros
      </button>
    </div>
  </div>
)

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(List)
