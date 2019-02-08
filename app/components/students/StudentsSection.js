import React from 'react'
import styles from './styles/students.css'
import StudentForm from './StudentForm'
import StudentList from './StudentList'
import StudentChart from './StudentChart'
import StudentDropdown from './StudentDropdown'

const StudentsSection = () => (
	<div>
		<div>
			<h2 className={styles.center_header}>Students</h2>
			<StudentForm />
			<StudentList />
		</div>
		<div className={styles.chart_div}>
			<h4 className={styles.chart_header}>Charts</h4>
			<StudentDropdown />
			<StudentChart />
		</div>
	</div>
)

export default StudentsSection
