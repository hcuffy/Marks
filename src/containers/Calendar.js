import React, {Component} from 'react';
import {connect} from 'react-redux';

import {CalendarComponent, SidemenuComponent} from '../components';
import {getEvents} from '../components/calendar/actions';

class Calendar extends Component {
    componentDidMount() {
        this.props.getEvents();
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

const mapDispatchToProps = {getEvents};

export default connect(null, mapDispatchToProps)(Calendar);
