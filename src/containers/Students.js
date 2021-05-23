import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getStudents} from '../actions';
import {getAllGradeData, getGraphExamData} from '../components/graphs/actions';
import {getSubjectData} from '../components/subject/actions';
import {getGradingSystem} from '../components/settings/actions';
import {displayClassData} from '../components/classroom/actions';

import {SidemenuComponent, StudentsComponent} from '../components';

class Students extends Component {
    componentDidMount() {
        this.props.getStudents();
        this.props.getAllGradeData();
        this.props.getGraphExamData();
        this.props.getSubjectData();
        this.props.getGradingSystem();
        this.props.displayClassData();
    }

    render() {
        return (
            <div>
                <SidemenuComponent />
                <StudentsComponent />
            </div>
        );
    }
}

const mapDispatchToProps = {
    getStudents,
    getAllGradeData,
    getGraphExamData,
    getSubjectData,
    getGradingSystem,
    displayClassData
};

export default connect(null, mapDispatchToProps)(Students);
