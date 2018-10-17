// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SchoolData from '../components/SchoolData'
import { actionCreators } from '../actions/index'

const mapStateToProps = state => ({
  title: state.title
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SchoolInfo)
