import React, {Component} from 'react';
import {connect} from 'react-redux';

import {SidemenuComponent, GradeTableComponent} from '../components';
import {getStudents} from '../components/students/actions';
import {getSubjectData} from '../components/subject/actions';
import {displayClassData} from '../components/classroom/actions';

class Grades extends Component {
    componentDidMount() {
        if (this.props.classData) {
            this.props.displayClassData();
            this.props.getSubjectData();
            this.props.getStudents();
        }
    }

    render() {
        return (
            <div>
                <SidemenuComponent/>
                <GradeTableComponent/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classData: state.classData.classData
});

const mapDispatchToProps = {displayClassData, getSubjectData, getStudents};

export default connect(mapStateToProps, mapDispatchToProps)(Grades);
