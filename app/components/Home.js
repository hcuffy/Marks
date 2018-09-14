import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { actionCreators } from '../actions/school';
import styles from './styles/Home.css';
import School from './counter';
import  { db } from '../database';

db.findOne({ first: 'Digi' }, (err, doc) => {
  console.log('Found user:', doc.first);
});


class Home extends Component {

  render() {
    return (
      <div className={styles.container} data-tid="container">
      <h1>Testing</h1>
        <Login/>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
      registering: 'test'
    })

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(actionCreators, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(Home);
