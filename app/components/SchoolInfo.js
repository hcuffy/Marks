// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { actionCreators } from '../actions/index';
import styles from './styles/SchoolData.css';


const SchoolInfo = ({schoolData,initialS, actions}) => (

    <div className={styles.school_data_div}>
     <span>{schoolData.title}</span>
      <br />
      <span>{schoolData.street}</span>
      <br />
      <span>{schoolData.state}</span>
      <br />
      <span>{schoolData.country}</span>
      <br />
      <span>{schoolData.year}</span>
    </div>
);

  const mapStateToProps = (state) => {
      return {
        schoolData: state.schoolData
      }
  }

  const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actionCreators, dispatch) })

  export default connect(mapStateToProps, mapDispatchToProps)(SchoolInfo);
