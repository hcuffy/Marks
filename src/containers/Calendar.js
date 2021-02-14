import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CalendarComponent, SidemenuComponent} from '../components';
import {actionCreators} from '../actions/index';

class Calendar extends Component {
    componentDidMount() {
        this.props.actions.getEvents;
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <SidemenuComponent />
                <CalendarComponent t={t} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(Calendar);
