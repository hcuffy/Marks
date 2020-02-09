import React from 'react'
import { withTranslation } from 'react-i18next'
import ExamListDropdown from './ExamListDropdown'
import ExamListInputs from './ExamListInputs'
import ExamModal from './ExamModal'
import css from './styles/exam.css'

const ExamList = ({ t }) => (
	<div className={css.main_div}>
		<div className={css.edit_div}>
			<h4 className={css.edit_header}>{t('exam.editExamHeader')}</h4>
			<ExamListDropdown t={t} />
		</div>

		<div>
			<ExamListInputs />
			<ExamModal t={t} />
		</div>
	</div>
)

export default withTranslation()(ExamList)
