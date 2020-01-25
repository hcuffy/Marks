import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { GERMAN_LINKS, ENGLISH_LINKS } from '../../../constants/externalLinks'
import { currentLanguage } from '../../../utils/translationUtil'
import css from '../homepage.css'

const _ = require('lodash')

export const resourceList = openResource => {
	const primaryLang = _.isUndefined(currentLanguage())
		? 'de'
		: currentLanguage().slice(0, 2)

	const LanguageLinks = primaryLang === 'de' ? GERMAN_LINKS : ENGLISH_LINKS

	const list = _.keys(LanguageLinks).map((data, idx) => (
		<div key={idx}>
			<ListGroupItem
				data-name={LanguageLinks[data]}
				className={css.resource_btn}
				onClick={openResource}
			>
				{data}
			</ListGroupItem>
		</div>
	))

	return <ListGroup>{list}</ListGroup>
}
