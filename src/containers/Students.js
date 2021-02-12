import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SidemenuComponent, StudentsComponent} from '../components';
import {actionCreators} from '../actions/index';

class Students extends Component {
    componentDidMount() {
        this.props.actions.getStudents();
        this.props.actions.getAllGradeData();
        this.props.actions.getGraphExamData();
        this.props.actions.getSubjectData();
        this.props.actions.getGradingSystem();
        this.props.actions.displayClassData();
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <SidemenuComponent />
                <StudentsComponent t={t} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(Students);
