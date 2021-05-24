import React, {Component} from 'react';
import {connect} from 'react-redux';

import {SidemenuComponent, SettingsComponent} from '../components';
import {getGradingSystem, displayAddress} from '../components/settings/actions';

class Settings extends Component {
    componentDidMount() {
        this.props.getGradingSystem();
        this.props.displayAddress();
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <SidemenuComponent />
                <SettingsComponent t={t} />
            </div>
        );
    }
}

const mapStateToProps = state => ({addressData: state.addressData});

const mapDispatchToProps = {getGradingSystem, displayAddress};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
