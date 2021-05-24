import React, {Component} from 'react';
import {connect} from 'react-redux';

import {CapabilityComponent, SidemenuComponent} from '../components';

import {displayClassData} from '../components/classroom/actions';
import {getStudents} from '../components/students/actions';
import {getAnswers} from '../components/capability/actions';

class Capability extends Component {
    componentDidMount() {
        if (this.props.classData) {
            this.props.displayClassData();
            this.props.getStudents();
            this.props.getAnswers();
        }
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <SidemenuComponent />
                <CapabilityComponent t={t} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classData: state.classData.classData
});

const mapDispatchToProps = {displayClassData, getStudents, getAnswers};

export default connect(mapStateToProps, mapDispatchToProps)(Capability);
