import React, {Component} from 'react';
import {connect} from 'react-redux';

import {SidemenuComponent, NoteComponent} from '../components';
import {getStudents} from '../components/students/actions';
import {getNotes} from '../components/notes/actions';

class Notes extends Component {
    componentDidMount() {
        this.props.getStudents();
        this.props.getNotes();
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <SidemenuComponent/>
                <NoteComponent t={t}/>
            </div>
        );
    }
}

const mapDispatchToProps = {getStudents, getNotes};

export default connect(null, mapDispatchToProps)(Notes);
