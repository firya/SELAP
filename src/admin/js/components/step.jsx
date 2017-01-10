import React from 'react';
import { connect } from "react-redux"
import Button from './button.jsx'

@connect((store) => {
	return {
		lang: store.lang.lang
	}
})

export default class Step extends React.Component {
	handlePrevStep() {
		this.props.goToStep(this.props.index - 1);
	}
	handleNextStep() {
		this.props.goToStep(this.props.index + 1);
	}
	handleFinish() {
		this.props.finish();
	}
	render() {
		const { index, total, lang } = this.props

		let nav = ''

		if (this.props.nav) {
			let prev, next

			if (index < total - 1) {
				next = <Button className="s-steps__next" text={lang.next} clickAction={this.handleNextStep.bind(this)} />
			}
			if (index > 0) {
				prev = <Button className="s-steps__prev" text={lang.prev} clickAction={this.handlePrevStep.bind(this)} />
			}

			nav = <div className="s-steps__nav">{prev}{next}</div>
		}
		
		return (
			<div className="s-steps__content">
				{this.props.children}
				{nav}
			</div>
		)
	}
}

Step.defaultProps = {
	nav: true
}