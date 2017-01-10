import React from 'react'
import { connect } from "react-redux"

import SVG from './inlinesvg.jsx'

@connect((store) => {
	return {
		lang: store.lang.lang, 
	}
})

export default class Input extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			focused: "",
			empty: (this.props.value != "") ? false : true, 
			error: (this.props.error) ? true : false, 
			showPassword: false
		}
	}
	propTypes: {
		id: React.PropTypes.string.isRequired,
		name: React.PropTypes.string.isRequired,
		label: React.PropTypes.string.isRequired,
		class: React.PropTypes.string,
		value: React.PropTypes.string,
		error: React.PropTypes.string,
		type: React.PropTypes.string,
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		regexp: React.PropTypes.string,
	}
	_handleInputChange(e) {
		this._change(e.target.value)
	}
	_handleCheckboxChange(e) {
		this._change(!this.props.value)
	}
	_handleSelectChange(e) {
		const value = e.target.value
		const name = this.props.name

		if (this.props.inputChange) {
			this.props.inputChange(name, {
				value: value
			})
		}
	}
	_handleFocus() {
		this.setState({focused: true})
	}
	_handleBlur() {
		this.setState({focused: false})
	}
	componentWillMount() {
		if (this.props.value && this.props.type != 'select') {
			this._validate(this.props.value)
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.validate == true && this.props.validate == false && this.props.type != 'select') {
			this._validate(this.props.value)
		}
	}
	_validate(value) {
		const { lang, min, max, inputChange, type, isRequired } = this.props
		let { regexp } = this.props
		if (inputChange) {
			let e = ''
			let e_regexp = "VALIDATION_ERROR_REGEXP"

			switch(type) {
				case 'email': {
					regexp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
					e_regexp = "VALIDATION_ERROR_EMAIL"
				}
			}

			if (value.length > 0) {
				if (value.search(regexp)) {
					e = e_regexp
				}
				if (value.length < min) {
					e = "VALIDATION_ERROR_TOO_SHORT"
				}
				if (max > 0 && value.length > max) {
					e = "VALIDATION_ERROR_TOO_LONG"
				}
				if (isRequired && value.length == 0) {
					e = "VALIDATION_ERROR_REQUIRED"
				}
			}

			inputChange(this.props.name, {
				value: value, 
				error: e, 
				validate: false
			})
		}
	}
	_change(value = this.props.value) {
		const inputText = value
		const name = this.props.name

		if (inputText == '') {
			this.setState({empty: true})
		} else {
			this.setState({empty: false})
		}
		
		this._validate(inputText)
	}
	_togglePassword(e) {
		e.preventDefault()
		this.setState({
			showPassword: !this.state.showPassword
		})
	}
	_renderInput() {
		const { id, name, value, label, type } = this.props

		let displayType = type
		let icon = ''
		if (type == 'password') {
			icon = <div className="s-input__icon" onClick={this._togglePassword.bind(this)}><SVG glyph={(this.state.showPassword) ? 'eye-closed' : 'eye'} width={20} height={11} /></div>
			if (this.state.showPassword) {
				displayType = 'text'
			}
		}

		return (
			<div className="s-input__wrapper">
				<input type={displayType} 
					id={id} 
					name={name} 
					value={value} 
					className='s-input__input'
					onFocus={this._handleFocus.bind(this)} 
					onBlur={this._handleBlur.bind(this)} 
					onChange={this._handleInputChange.bind(this)} />
				<label htmlFor={id} className="s-input__label">{label}</label>
				{icon}
				<div className="s-input__line"></div>
			</div>
			
		)
	}
	_renderCheckbox() {
		const { id, name, value, label, type } = this.props

		return (
			<div className="s-input__wrapper">
				<input type={type} 
						id={id} 
						name={name} 
						checked={value} 
						className='s-input__checkbox' 
						onChange={this._handleCheckboxChange.bind(this)} />
				<label htmlFor={id} className='s-input__fakecheckbox'><SVG glyph='check' className='s-input__check' width={18} height={13} /></label>
				<label htmlFor={id} className="s-input__label">{label}</label>
			</div>
		)
	}
	_renderSelect() {
		const { value, id, name, selected, label } = this.props

		const mappedValue = Object.keys(this.props.value).map((item, i) => {
			return <option key={i} value={item}>{value[item]}</option>
		})

		return (
			<div className="s-input__wrapper">
				<select 
					name={name} 
					id={id} 
					value={selected} 
					className="s-input__select" 
					onChange={this._handleSelectChange.bind(this)}
					onFocus={this._handleFocus.bind(this)} 
					onBlur={this._handleBlur.bind(this)} >
					{mappedValue}
				</select>
				<label htmlFor={id} className="s-input__label">{label}</label>
				<div className="s-input__line"></div>
			</div>
			
		)
	}
	_addClass(className = '') {
		let addClass = ''
		if (this.props.error != '') {
			addClass += ' s-is--error'
		}
		if (this.state.focused) {
			addClass += ' s-is--focused'
		}
		if (this.state.empty) {
			addClass += ' s-is--empty'
		}
		if (this.props.class != '') {
			addClass += ' '+this.props.class
		}
		if (className.length > 0) {
			addClass += ' '+className
		}
		return addClass
	}
	render() {
		const { id, name, value, label, error, type } = this.props
		
		let inputRender = ''
		let className = ''
		switch (type) {
			case 'select': 
				inputRender = this._renderSelect()
				break
			case 'checkbox': 
				className = 's-input--checkbox'
				inputRender = this._renderCheckbox()
				break
			default: 
				inputRender = this._renderInput()
				break
		}

		return (
			<div className={"s-input"+this._addClass(className)}>
				{inputRender}
				<div className="s-input__error">{error}</div>
			</div>
		)
	}
}

Input.defaultProps = {
	type: 'text', 
	class: '', 
	error: '', 
	isRequired: false, 
	min: 0,
	max: 0, 
	selected: 0, 
	regexp: /^.*$/g
}