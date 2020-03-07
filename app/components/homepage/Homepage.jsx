import React from 'react'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import { resourceList } from './helpers/resourcesList'
import { addressElements } from '../helpers/formValidation'
import { openResource } from '../../utils/resourcesLinks'
import css from './homepage.css'

const _ = require('lodash')

const Homepage = ({ t, addressData }) => {
	const entry = _.values(addressElements(addressData)).map((data, idx) => (
		<li key={idx}>{data}</li>
	))

	return (
		<div className={css.main_school_div}>
			<h4 className={css.main_header}> {t('home.title')}</h4>
			<div className={css.school_left_div}>
				<div>
					<p>{t('home.addressHeader')}</p>

					<span>{entry}</span>
				</div>
			</div>

			<div className={css.school_right_div}>
				<div>
					<p>{t('home.resourcesHeader')}</p>

					{resourceList(openResource)}
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	addressData: state.addressData
})

export default connect(mapStateToProps, null)(withTranslation()(Homepage))
