import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SidemenuComponent, GradeTableComponent} from '../components';
import {actionCreators} from '../actions/index';

class Grades extends Component {
    componentDidMount() {
        if (this.props.classData) {
            this.props.actions.displayClassData();
            this.props.actions.getSubjectData();
            this.props.actions.getStudents();
        }
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <SidemenuComponent />
                <GradeTableComponent t={t} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classData: state.classData.classData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Grades);
