import React, {Component} from 'react';
import {connect} from 'react-redux';

import {SidemenuComponent, HomeComponent} from '../components';
import {displayAddress, getGradingSystem} from '../components/settings/actions';

class Home extends Component {
    componentDidMount() {
        this.props.displayAddress();
        this.props.getGradingSystem();
    }

    render() {
        return (
            <div>
                <SidemenuComponent/>
                <HomeComponent/>
            </div>
        );
    }
}

const mapDispatchToProps = {displayAddress, getGradingSystem};

export default connect(null, mapDispatchToProps)(Home);
