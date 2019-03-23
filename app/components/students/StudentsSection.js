import React from 'react'
import { withNamespaces } from 'react-i18next'
import StudentForm from './StudentForm'
import StudentList from './StudentList'
import StudentChart from './StudentChart'
import StudentDropdown from './StudentDropdown'
import styles from './styles/students.css'

const StudentsSection = ({ t }) => (
	<div>
		<div className={styles.student_home_div}>
			<h4 className={styles.center_header}>{t('student.title')}</h4>
			<StudentForm t={t} />
			<StudentList t={t} />
		</div>
		<div className={styles.chart_div}>
			<h4 className={styles.chart_header}>{t('student.chartTitle')}</h4>
			<StudentDropdown t={t} />
			<StudentChart t={t} />
		</div>
	</div>
)

export default withNamespaces()(StudentsSection)
