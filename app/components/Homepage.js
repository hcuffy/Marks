import React from 'react'
import { connect } from 'react-redux'
import i18next from 'i18next'
import styles from './styles/homepage.css'

const _ = require('lodash')

const t = translate => i18next.t(translate)

const Homepage = ({ schoolData }) => {
	const entry = _.values(schoolData).map((data, idx) => <li key={idx}>{data}</li>)

	return (
		<div className={styles.main_school_div}>
			<div className={styles.school_left_div}>
				<div>
					<p>Your School Address</p>
					<span>{entry}</span>
				</div>
				<div className={styles.page_inner_div}>
					<p>Your Classrooms</p>
					<span>Under Development</span>
				</div>
			</div>

			<div className={styles.school_right_div}>
				<div>
					<p>{t('title')}</p>
					<span>Under Development</span>
				</div>
				<div className={styles.page_inner_div}>
					<p>Your Subjects</p>
					<span>Under Development</span>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	schoolData: state.schoolData
})

export default connect(
	mapStateToProps,
	null
)(Homepage)
