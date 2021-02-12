import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CapabilityComponent, SidemenuComponent} from '../components';

import {actionCreators} from '../actions/index';

class Capability extends Component {
    componentDidMount() {
        if (this.props.classData) {
            this.props.actions.displayClassData();
            this.props.actions.getStudents();
            this.props.actions.getAnswers();
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

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Capability);
