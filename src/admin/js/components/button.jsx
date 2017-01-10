import React from 'react'

export default class Button extends React.Component {
	constructor() {
		super()
	}
	propTypes: {
		text: React.PropTypes.string.isRequired,
		className: React.PropTypes.string,
	}
	handleClick(event) {
		event.preventDefault()
		this.props.clickAction(event)
	}
	render() {
		const { text, className } = this.props
		return (
			<a href="#" className={"s-button "+className} onClick={this.handleClick.bind(this)}>
				{this.props.text}
			</a>
		)
	}
}

Button.defaultProps = {
	className: ''
}