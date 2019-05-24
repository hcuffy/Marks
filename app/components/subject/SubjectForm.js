/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import styles from './styles/subject.css'

const _ = require('lodash')

const generateInputs = (t, labels) =>
	_.values(labels).map((data, idx) => (
		<div key={idx} className={styles.form_div}>
			<label className={styles.form_label} htmlFor={`${data}Sid`}>
				{t(`room.${data}`)}:
			</label>
			{/* eslint-disable-next-line max-len */}
			<input
				name={data}
				className="form-control"
				data-id={`${data}Sid`}
				type="text"
				required
			/>
		</div>
	))

const SubjectForm = ({ t, classListData, subjects, actions }) => {
	const formLabels = _.pick(classListData, ['name', 'abbreviation'])
	const formInputs = generateInputs(t, formLabels)

	const selectOption = _.values(subjects).map((data, idx) => (
		<option className="form-control dropup" key={idx}>
			{data.name}
		</option>
	))

	return (
		<div>
			<form onSubmit={actions.addNewSubject} method="POST">
				{formInputs}
				<div className={styles.form_div}>
					<label className={styles.form_label} htmlFor="cSelect">
						{t('general.selectClass')}:
					</label>
					<select type="text" name="room" className="form-control">
						{selectOption}
					</select>
				</div>
				<div className={styles.subject_save}>
					<button type="submit" className="btn btn-success">
						{t('general.add')}
					</button>
				</div>
			</form>
		</div>
	)
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	null,
	mapDispatchToProps
)(withNamespaces()(SubjectForm))
