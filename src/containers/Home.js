import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SidemenuComponent, HomeComponent} from '../components';
import {actionCreators} from '../actions/index';

class Home extends Component {
    componentDidMount() {
        this.props.actions.displayAddress();
        this.props.actions.getGradingSystem();
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <SidemenuComponent />
                <HomeComponent t={t} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(Home);
