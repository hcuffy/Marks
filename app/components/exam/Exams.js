import React from 'react'
import { t } from '../../utils/translationUtil'
import ExamForm from './ExamForm'
import ExamList from './ExamList'
import styles from './styles/exam.css'

const Exam = () => (
	<div>
		<div className={styles.header_div}>
			<h4>{t('exam.addExamHeader')}</h4>
			<ExamForm />
		</div>
		<div>
			<ExamList />
		</div>
	</div>
)

export default Exam
