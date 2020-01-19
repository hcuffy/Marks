import React from 'react'
import { withNamespaces } from 'react-i18next'
import NotesDropdown from './NotesDropdown'
import NotesForm from './NotesForm'
import css from './styles/notes.css'

const NotesSection = ({ t }) => (
	<div className={css.notes_wrapper}>
		<h4 className={css.main_header}>{t('notes.sectionTitle')}</h4>
		<NotesDropdown t={t} />
		<NotesForm t={t} />
	</div>
)

export default withNamespaces()(NotesSection)
