import React from 'react'
import styles from './styles/students.css'
import StudentForm from './StudentForm'
import StudentList from './StudentList'

const StudentsSection = () => (
	<div>
		<h2 className={styles.center_header}>Students</h2>
		<StudentForm />
		<StudentList />
	</div>
)

export default StudentsSection
