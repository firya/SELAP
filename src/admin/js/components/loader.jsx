import React from 'react'

export default class Loader extends React.Component {
	render() {
		return (
			<div className='s-loader'>
				<div className="s-loader__center">
					<div className="s-loader__load"></div>
				</div>
			</div>
		)
	}
}