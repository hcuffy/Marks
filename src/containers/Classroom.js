import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SideMenu from '../components/sidemenu/SideMenu';
import Navbar from '../components/classroom/Navbar';
import Classes from '../components/classroom/Classes';
import Exams from '../components/exam/Exams';
import {actionCreators} from '../actions/index';

class Classroom extends Component {
    componentDidMount() {
        if (this.props.classData) {
            this.props.actions.displayClassData();
            this.props.actions.getSubjectData();
        }
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <SideMenu />
                <Navbar t={t} />
                {this.props.classesActive && <Classes t={t} />}
                {this.props.examActive && <Exams t={t} />}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classesActive: state.tabChangeData.classTab,
    examActive:    state.tabChangeData.examTab,
    classData:     state.classData.classData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);
