import React, {Component} from 'react';
import {connect} from 'react-redux';

import {displayClassData} from '../components/classroom/actions';
import {getSubjectData} from '../components/subject/actions';
import {SidemenuComponent, NavbarComponent, ClassroomComponent, ExamComponent} from '../components';

class Classroom extends Component {
    componentDidMount() {
        if (this.props.classData) {
            this.props.displayClassData();
            this.props.getSubjectData();
        }
    }

    render() {
        const {classesActive, examActive} = this.props;

        return (
            <div>
                <SidemenuComponent/>
                <NavbarComponent/>
                {classesActive && <ClassroomComponent/>}
                {examActive && <ExamComponent/>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classesActive: state.tabChangeData.classTab,
    examActive:    state.tabChangeData.examTab,
    classData:     state.classData.classData
});

const mapDispatchToProps = {displayClassData, getSubjectData};

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);
