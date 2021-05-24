import React, {Component} from 'react';
import {connect} from 'react-redux';

import {SidemenuComponent, GraphComponent} from '../components';
import {getAllGradeData, getGraphExamData} from '../components/graphs/actions';
import {displayClassData} from '../components/classroom/actions';
import {getSubjectData} from '../components/subject/actions';
import {getStudents} from '../components/students/actions';
import {getGradingSystem} from '../components/settings/actions';

class Graphs extends Component {
    componentDidMount() {
        if (this.props.classData) {
            this.props.getAllGradeData();
            this.props.getGraphExamData();
            this.props.displayClassData();
            this.props.getSubjectData();
            this.props.getStudents();
            this.props.getGradingSystem();
        }
    }

    render() {
        return (
            <div>
                <SidemenuComponent />
                <GraphComponent/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classData: state.classData.classData
});

const mapDispatchToProps = {
    getAllGradeData,
    getGraphExamData,
    displayClassData,
    getSubjectData,
    getStudents,
    getGradingSystem
};

export default connect(mapStateToProps, mapDispatchToProps)(Graphs);
