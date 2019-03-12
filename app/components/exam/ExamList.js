import React from 'react'
import { t } from '../../utils/translationUtil'
import ExamListDropdown from './ExamListDropdown'
import ExamListInputs from './ExamListInputs'
import ExamModal from './ExamModal'
import styles from './styles/exam.css'

const ExamList = () => (
	<div className={styles.main_div}>
		<div className={styles.edit_div}>
			<h4 className={styles.edit_header}>{t('exam.editExamHeader')}</h4>
			<ExamListDropdown />
		</div>
		<div>
			<ExamListInputs />
			<ExamModal />
		</div>
	</div>
)

export default ExamList
