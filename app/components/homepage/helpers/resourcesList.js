import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { GERMAN_LINKS, ENGLISH_LINKS } from '../../../constants/externalLinks'
import { currentLanguage } from '../../../utils/translationUtil'
import styles from '../styles/homepage.css'

const _ = require('lodash')

export const resourceList = actions => {
	// eslint-disable-next-line max-len
	const firstTwo = _.isUndefined(currentLanguage()) ? 'de' : currentLanguage().slice(0, 2)
	const links = firstTwo === 'de' ? GERMAN_LINKS : ENGLISH_LINKS

	const list = _.keys(links).map((data, idx) => (
		<div key={idx}>
			<ListGroupItem
				data-name={links[data]}
				className={styles.resource_btn}
				onClick={actions.goToResource}
			>
				{data}
			</ListGroupItem>
		</div>
	))

	return <ListGroup>{list}</ListGroup>
}
