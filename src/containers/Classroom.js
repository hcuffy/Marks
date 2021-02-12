import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SidemenuComponent, NavbarComponent, ClassroomComponent, ExamComponent} from '../components';
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
                <SidemenuComponent />
                <NavbarComponent t={t} />
                {this.props.classesActive && <ClassroomComponent t={t} />}
                {this.props.examActive && <ExamComponent t={t} />}
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
