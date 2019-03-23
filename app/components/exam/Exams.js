import React from 'react'
import { withNamespaces } from 'react-i18next'
import ExamForm from './ExamForm'
import ExamList from './ExamList'
import styles from './styles/exam.css'

const Exam = ({ t }) => (
	<div>
		<div className={styles.header_div}>
			<h4>{t('exam.addExamHeader')}</h4>
			<ExamForm t={t} />
		</div>
		<div>
			<ExamList t={t} />
		</div>
	</div>
)

export default withNamespaces()(Exam)
