import React from 'react'
import styles from '../styles/settings.css'
import { t } from '../../../utils/translationUtil'

export const supportBtn = actions => (
	<button type="button" className={styles.support_div} onClick={actions.supportApp}>
		{t('settings.supportText')}
		<div className={styles.support_icon}>
			<i className="fab fa-paypal fa-2x" style={{ color: '#1e73be' }} />
			<i className="fas fa-hands-helping fa-2x" style={{ color: '#1e73be' }} />
		</div>
	</button>
)
