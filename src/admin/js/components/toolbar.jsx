import React from 'react'
import { connect } from "react-redux"
import { browserHistory, Link } from 'react-router'

import Button from './button.jsx'
import Popup from './popup.jsx'

import { postVariables } from "../actions/variablesActions.jsx"
import { _t } from '../actions/langActions.jsx'

@connect((store) => {
	return {
		variables: store.variables,
		lang: store.lang.lang, 
	}
})

export default class Toolbar extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			addVariable: false
		}
	}
	_save() {
		console.log(this.props.variables)
	}

	_showPopup(id) {
		this.setState({
			[id]: true
		})
	}

	_hidePopup(id) {
		this.setState({
			[id]: false
		})
	}

	render() {
		const { lang } = this.props

		let popup = ''
		if (this.state.addVariable) {
			popup = <Popup closeAction={this._hidePopup.bind(this, "addVariable")} />
		}

		return (
			<div className="s-toolbar">
				<Button text={_t(lang, "save")} clickAction={this._save.bind(this)} />
				<Button text={_t(lang, "addVariable")} clickAction={this._showPopup.bind(this, "addVariable")} />
				{popup}
			</div>
		)
	}
}