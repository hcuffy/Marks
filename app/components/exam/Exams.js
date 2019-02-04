import React from 'react'
import styles from './styles/exam.css'
import ExamForm from './ExamForm'
import ExamList from './ExamList'

const Exam = () => (
	<div>
		<div className={styles.header_div}>
			<h4>Add Exam</h4>
			<ExamForm />
		</div>
		<div>
			<ExamList />
		</div>
	</div>
)

export default Exam
