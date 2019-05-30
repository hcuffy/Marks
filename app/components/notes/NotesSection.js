import React from 'react'
import NotesDropdown from './NotesDropdown'
import NotesForm from './NotesForm'
import styles from './styles/notes.css'

const NotesSection = () => (
	<div className={styles.settings_wrapper}>
		<h4 className={styles.main_header}>Notes</h4>
		<NotesDropdown />
		<NotesForm />
	</div>
)

export default NotesSection
