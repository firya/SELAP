import React from 'react'
import { connect } from "react-redux"
import { browserHistory, Link } from 'react-router'

import { logout } from "../actions/userActions.jsx"

@connect((store) => {
	return {}
})

export default class Nav extends React.Component {
	_exit(e) {
		e.preventDefault()
		this.props.dispatch(logout())
	}

	render() {
		return (
			<nav className="s-nav">
				<Link to={'/'} className='s-nav__link'>Selap</Link>
				<Link to={'/variables'} className='s-nav__link'>Variables</Link>
				<Link to={'/settings'} className='s-nav__link'>Settings</Link>
				<Link to={'/structure'} className='s-nav__link'>Structure</Link>
				<Link to={'/editor'} className='s-nav__link'>Editor</Link>
				<Link to={'/mail'} className='s-nav__link'>Mail</Link>
				<div className="s-nav__link" onClick={this._exit.bind(this)}>Exit</div>
			</nav>
		)
	}
}