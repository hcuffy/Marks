/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { Button } from 'reactstrap'
import css from './styles/subject.css'

const _ = require('lodash')

const generateInputs = (t, labels) =>
	_.values(labels).map((data, idx) => (
		<div key={idx} className={css.form_div}>
			<label className={css.form_label} htmlFor={`${data}Sid`}>
				{t(`room.${data}`)}:
			</label>

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
				<div className={css.form_div}>
					<label className={css.form_label} htmlFor="cSelect">
						{t('general.selectClass')}:
					</label>
					<select type="text" name="room" className="form-control">
						{selectOption}
					</select>
				</div>
				<div className={css.subject_save}>
					<Button type="submit" className="btn btn-success">
						{t('general.add')}
					</Button>
				</div>
			</form>
		</div>
	)
}
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(null, mapDispatchToProps)(withNamespaces()(SubjectForm))
