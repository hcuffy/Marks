import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { t } from '../../utils/translationUtil'
import { actionCreators } from '../../actions/index'
import styles from './styles/room.css'
import ClassList from './ClassList'
import Subjects from '../subject/Subjects'

const _ = require('lodash')

const checkChange = (classData, actions) => {
	if (classData.check) {
		actions.displayClassData()
	}
}

const createFormInputs = labels =>
	_.keys(labels).map((data, idx) => (
		<div key={idx} className={styles.room_form}>
			<label className={styles.room_form_label} htmlFor={`${data}Id`}>
				{t(`room.${data}`)}:
			</label>
			<input
				name={data}
				className="form-control"
				id={`${data}Id`}
				type="text"
				defaultValue={labels[data]}
			/>
		</div>
	))
const Classes = ({ classData, actions }) => {
	const formLabels = _.omit(classData, ['classData', 'check'])
	const formInputs = createFormInputs(formLabels)

	checkChange(classData, actions)
	return (
		<div className={styles.room_div}>
			<form onSubmit={actions.handleClassData} method="POST">
				<div className={styles.form_outer_div}>
					<h4 className={styles.center_header}>{t('room.addClassHeader')}</h4>
					{formInputs}
					<div className={(styles.form_div, styles.save_btn)}>
						<button type="submit" className="btn btn-success">
							{t('general.add')}
						</button>
					</div>
				</div>
			</form>
			<div>
				<h4 className={styles.center_header}>{t('room.listHeader')}</h4>
				<ClassList listData={classData} />
			</div>
			<Subjects classData={classData} />
		</div>
	)
}
const mapStateToProps = state => ({
	classData: state.classData
})

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Classes)
