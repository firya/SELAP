import React from 'react'

import Nav from '../components/nav.jsx'
import Toolbar from '../components/toolbar.jsx'

export default class Layout extends React.Component {
	render() {
		return (
			<div className='s-layout'>
				<Nav />
				<div className="s-container">
					<Toolbar />
					<div className="s-content">{this.props.children}</div>
				</div>
			</div>
		)
	}
}