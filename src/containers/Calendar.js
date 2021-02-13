import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {CalendarComponent, SidemenuComponent} from '../components';

import {actionCreators} from '../actions/index';

class Calendar extends Component {
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

const mapStateToProps = state => ({
    calendarData: state.calendarData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
