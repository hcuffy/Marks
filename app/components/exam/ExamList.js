import React from 'react'
import ExamListDropdown from './ExamListDropdown'
import ExamListInputs from './ExamListInputs'
import ExamModal from './ExamModal'
import styles from './styles/exam.css'

const ExamList = () => (
	<div className={styles.main_div}>
		<div>
			<h4>Edit Exam</h4>
			<ExamListDropdown />
		</div>
		<div>
			<ExamListInputs />
			<ExamModal />
		</div>
	</div>
)

export default ExamList
