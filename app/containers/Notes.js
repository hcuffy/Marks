import React, { Component } from 'react'
import { connect } from 'react-redux'
import SideMenu from '../components/sidemenu/SideMenu'
import NotesSection from '../components/notes/NotesSection'

class Notes extends Component {
	render() {
		return (
			<div>
				<SideMenu />
				<NotesSection />
			</div>
		)
	}
}

export default connect(
	null,
	null
)(Notes)
