// @flow
import React, { Component, Fragment, Node } from 'react'

type Props = {
	children: Node
};

export default class App extends Component<Props> {
	props: Props

	render() {
		const { children } = this.props
		return <Fragment>{children}</Fragment>
	}
}
