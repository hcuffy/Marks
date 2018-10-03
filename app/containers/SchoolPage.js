import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import School from '../components/School';
import { actionCreators } from '../actions/index';

const mapStateToProps = (state) => ({
        title: state.title
    })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(School);
