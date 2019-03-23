import React from 'react'
import { withNamespaces } from 'react-i18next'
import ExamListDropdown from './ExamListDropdown'
import ExamListInputs from './ExamListInputs'
import ExamModal from './ExamModal'
import styles from './styles/exam.css'

const ExamList = ({ t }) => (
	<div className={styles.main_div}>
		<div className={styles.edit_div}>
			<h4 className={styles.edit_header}>{t('exam.editExamHeader')}</h4>
			<ExamListDropdown t={t} />
		</div>
		<div>
			<ExamListInputs />
			<ExamModal t={t} />
		</div>
	</div>
)

export default withNamespaces()(ExamList)
