import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import School from '../components/School';
import * as SchoolActions from '../actions/school';

function mapStateToProps(state) {
  return {
    school: state.school
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SchoolActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(School);
