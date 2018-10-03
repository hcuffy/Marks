import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { actionCreators } from '../actions/index';
import routes from '../constants/routes.json';
import styles from './styles/SchoolData.css';
import { getSchoolData } from '../database/schoolDB';


const SchoolInfo = ({schoolData, actions}) => (

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

   <button onClick={actions.handleSchoolDataDisplay}>Test</button>
    </div>
  );

  const mapStateToProps = (state) => {
      return {
        schoolData: state.schoolData
      }
  }

  const mapDispatchToProps = (dispatch) => {
     return { actions: bindActionCreators(actionCreators, dispatch) }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(SchoolInfo);
