import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {SidemenuComponent, NoteComponent} from '../components';
import {actionCreators} from '../actions/index';

class Notes extends Component {
    componentDidMount() {
        this.props.actions.getStudents();
        this.props.actions.getNotes();
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <SidemenuComponent />
                <NoteComponent t={t} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(null, mapDispatchToProps)(Notes);
