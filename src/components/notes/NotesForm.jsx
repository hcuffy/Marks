import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {bindActionCreators} from 'redux';

import {actionCreators} from '../../actions/index';
import noteForm from './formHelpers';

function NotesForm({t, notesData, actions}) {
    return <div>{noteForm(t, actions, notesData)}</div>;
}

const mapStateToProps = state => ({
    notesData: state.notesData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NotesForm));
