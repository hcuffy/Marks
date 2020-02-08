import React from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../actions/index'
import { generateInputs } from './helpers/formHelpers'
import { Button, Input, Label } from 'reactstrap'
import css from './styles/subject.css'

const _ = require('lodash')

const SubjectForm = ({ t, classListData, subjects, actions }) => {
	const formInputs = generateInputs(t, classListData)

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
					<Label className={css.form_label} htmlFor="cSelect">
						{t('general.selectClass')}:
					</Label>
					<select type="text" name="room" className="form-control">
						{selectOption}
					</select>
				</div>
				<div className={css.subject_save}>
					<Button type="submit" formNoValidate className="btn btn-success">
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

export default connect(null, mapDispatchToProps)(withTranslation()(SubjectForm))
