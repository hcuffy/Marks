import React from 'react'
import styles from './styles/students.css'
import { t } from '../../utils/translationUtil'
import StudentForm from './StudentForm'
import StudentList from './StudentList'
import StudentChart from './StudentChart'
import StudentDropdown from './StudentDropdown'

const StudentsSection = () => (
	<div>
		<div className={styles.student_home_div}>
			<h4 className={styles.center_header}>{t('student.title')}</h4>
			<StudentForm />
			<StudentList />
		</div>
		<div className={styles.chart_div}>
			<h4 className={styles.chart_header}>{t('student.chartTitle')}</h4>
			<StudentDropdown />
			<StudentChart />
		</div>
	</div>
)

export default StudentsSection
