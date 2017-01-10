import React from 'react';

export default class Steps extends React.Component {
	constructor(props) {
		super(props)
		
		let selected = 0
		if (this.props.selected) {
			selected = this.props.selected
			const childrenNum = this.props.children.length
			if (selected > childrenNum - 1) {
				selected = childrenNum - 1
			} else if (selected < 0) {
				selected = 0
			}
		}
		this.state = {
			selected: selected
		}
	}
	propTypes: {
		selected: React.PropTypes.number
	}
	handleClick(i, e) {
		e.preventDefault();
		if (this.props.children[this.state.selected].props.nav) {
			this.goToStep(i)
		}
	}
	goToStep(step) {
		if (this.props.stepChange) {
			this.props.stepChange(step)
		} else {
			this.setState({
				selected: step
			})
		}
	}
	finish() {
		console.log('finish him')
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.selected != this.props.selected) {
			this.setState({
				selected: nextProps.selected
			})
		}
	}
	_renderTabs() {
		const mappedTabs = this.props.children.map((child, i) => {
			let addClass = ''
			if (i <= this.state.selected) {
				addClass = ' s-is--active'
			}
			
			return <div key={i} onClick={this.handleClick.bind(this, i)} className={"s-steps__item"+addClass} style={{width: (100/this.props.children.length)+'%'}}>{child.props.label}</div>
		})

		return mappedTabs
	}
	_renderContent() {
		const stepsNum = this.props.children.length
		const mappedContent = this.props.children.map((child, i) => {
			const newChild = React.cloneElement(child, {
				index: i, 
				total: stepsNum, 
				goToStep: this.goToStep.bind(this), 
				finish: this.finish.bind(this) 
			})
			let panelClass = ''
			if (this.state.selected == i) {
				panelClass = ' s-is--active'
			}
			return (
				<div key={i} className={"s-steps__panel"+panelClass}>{newChild}</div>
			)
		})

		return mappedContent
	}
	render() {
		return (
			<div className="s-steps">
				<div className="s-steps__list">
					{this._renderTabs()}
					<div className="s-steps__progress">
						<div className="s-steps__line" style={{
							transform: "scaleX("+(this.state.selected/(this.props.children.length-1))+")"
						}}></div>
					</div>
				</div>
				<div className="s-form__line"></div>
				<div className="s-steps__wrapper">
					<div className="s-steps__panels" style={{
						transform: "translateX("+(-this.state.selected*100)+"%)"
					}}>
						{this._renderContent()}
					</div>
				</div>
			</div>
		)
	}
}