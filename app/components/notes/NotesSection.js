import React from 'react'
import { withNamespaces } from 'react-i18next'
import NotesDropdown from './NotesDropdown'
import NotesForm from './NotesForm'
import styles from './styles/notes.css'

const NotesSection = ({ t }) => (
	<div className={styles.settings_wrapper}>
		<h4 className={styles.main_header}>{t('notes.sectionTitle')}</h4>
		<NotesDropdown t={t} />
		<NotesForm t={t} />
	</div>
)

export default withNamespaces()(NotesSection)
