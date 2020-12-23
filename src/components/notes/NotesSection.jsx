import React from 'react';
import {withTranslation} from 'react-i18next';

import NotesDropdown from './NotesDropdown';
import NotesForm from './NotesForm';
import css from './styles/notes.css';

function NotesSection({t}) {
    return (
        <div className={css.notes_wrapper}>
            <h4 className={css.main_header}>{t('notes.sectionTitle')}</h4>
            <NotesDropdown t={t} />

            <NotesForm t={t} />
        </div>
    );
}

export default withTranslation()(NotesSection);
