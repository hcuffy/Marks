import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../actions/index';
import SideMenu from '../components/sidemenu/SideMenu';
import NotesSection from '../components/notes/NotesSection';

class Notes extends Component {
    componentDidMount() {
        this.props.actions.getStudents();
        this.props.actions.getNotes();
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <SideMenu />
                <NotesSection t={t} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(
    null,
    mapDispatchToProps
)(Notes);
