import React from 'react'
import { connect } from "react-redux"
import cookie from 'react-cookie'

import Input from '../components/input.jsx'
import Button from '../components/button.jsx'
import SVG from '../components/inlinesvg.jsx'

import { _t } from '../actions/langActions.jsx'
import { signIn } from '../actions/userActions.jsx'

@connect((store) => {
	return {
		config: store.config.config, 
		lang: store.lang.lang, 
	}
})

export default class Login extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			login: {
				value: "admin", 
				error: "",
				validate: false
			},
			password: {
				value: "admin", 
				error: "",
				validate: false
			},
			remember: {
				value: false, 
				error: "",
				validate: false
			}
		}
	}
	_signIn(e) {
		this.setState({
			login: {...this.state.login, validate: true}, 
			password: {...this.state.password, validate: true}
		}, () => {
			if (this.state.login.error == '' && this.state.password.error == '') {
				this.props.dispatch(signIn(this.props.config.baseUrl, {login: this.state.login.value, password: this.state.password.value, remember: this.state.remember.value})).then((result) => {
					if (result.value.data.error) {
						this.setState({
							login: Object.assign({}, this.state.login, result.value.data),
							password: Object.assign({}, this.state.password, result.value.data)
						})
					} else {
						//this.form.submit()
					}
				})
			}
		})
	}

	_changeInput(name, data = {}) {
		this.setState({
			[name]: Object.assign({}, this.state[name], data)
		})
	}

	render() {
	  	const { lang } = this.props
	  	const { login, password, remember } = this.state

		return (
			<div className='s-form__bg s-login'>
				<form method="POST" action={this.props.config.baseUrl+'admin'} ref={(form) => { this.form = form; }} className="s-form s-login__form">
					<div className="s-logo">
						<SVG glyph='logo' className='s-logo__glyph' width={120} height={80} />
						<div className="s-logo__desc">{_t(lang, "signin")}</div>
					</div>
					<div className="s-form__line"></div>
					<Input type='text' 
						label={_t(lang, "login")} 
						id='login' 
						name='login' 
						value={login.value} 
						error={_t(lang, login.error)} 
						inputChange={this._changeInput.bind(this)} 
						isRequired
						validate={login.validate} /> <br/>
					<Input 
						type='password' 
						label={_t(lang, "password")} 
						id='password' 
						name='password' 
						value={password.value} 
						error={_t(lang, password.error)} 
						inputChange={this._changeInput.bind(this)} 
						isRequired
						validate={password.validate} />
					<Input 
						type='checkbox' 
						label={_t(lang, "remember")} 
						id='remember' 
						name='remember' 
						value={remember.value} 
						inputChange={this._changeInput.bind(this)} />
					<Button text={_t(lang, "signin")} clickAction={this._signIn.bind(this)} />
				</form>
			</div>
		)
	}
}