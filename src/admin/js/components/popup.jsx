import React from 'react'
import { connect } from "react-redux"

import Button from './button.jsx'

import { _t } from '../actions/langActions.jsx'

@connect((store) => {
	return {
		lang: store.lang.lang, 
	}
})

export default class Toolbar extends React.Component {
	_close() {
		this.props.closeAction()
	}

	render() {
		const { lang } = this.props

		return (
			<div className="s-popup">
				<Button text={_t(lang, "close")} clickAction={this._close.bind(this)} />
			</div>
		)
	}
}