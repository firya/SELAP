import React from 'react'
import { connect } from "react-redux"

import { _t } from '../actions/langActions.jsx'
import { getVariables } from "../actions/variablesActions.jsx"

@connect((store) => {
	return {
		config: store.config.config, 
		user: store.user.user, 
		variables: store.variables.variables,
		lang: store.lang.lang, 
	}
})

export default class Variables extends React.Component {
	componentDidMount() {
		this.props.dispatch(getVariables(this.props.config.baseUrl, this.props.user.token))
	}
	render() {
		const { variables } = this.props
		
		let mappedVariables = ''
		if (variables.length > 0) {
			mappedVariables = variables.map((item, i) => {
				return <li key={i}>{item.label}</li>
			})
		}

		return (
			<div>
				<ul>
					{mappedVariables}
				</ul>
			</div>
		)
	}
}