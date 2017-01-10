import React from 'react'
import { connect } from "react-redux"

import Input from '../components/input.jsx'
import Button from '../components/button.jsx'
import Steps from '../components/steps.jsx'
import Step from '../components/step.jsx'
import SVG from '../components/inlinesvg.jsx'
import Loader from '../components/loader.jsx'

import { fetchLang, _t } from '../actions/langActions.jsx'
import { checkMySQL, postConfig } from '../actions/configActions.jsx'

@connect((store) => {
	return {
		config: store.config.config, 
		installed: store.config.installed, 
		lang: store.lang.lang, 
		vocabularies: store.lang.vocabularies,
		currentLang: store.lang.current, 
	}
})

export default class Install extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			step: 0, 
			language: {
				value: "en", 
				error: "",
				validate: false
			},
			login: {
				value: "", 
				error: "",
				validate: false
			},
			password: {
				value: "", 
				error: "",
				validate: false
			},
			storageType: {
				value: "mysql", 
				error: "",
				validate: false
			},
			db_name: {
				value: "", 
				error: "",
				validate: false
			},
			db_login: {
				value: "", 
				error: "",
				validate: false
			},
			db_password: {
				value: "", 
				error: "",
				validate: false
			},
			db_host: {
				value: "localhost", 
				error: "",
				validate: false
			},
			db_prefix: {
				value: "s_", 
				error: "",
				validate: false
			},
			done: false
		}
	}

	_submitHandler(e) {
		e.preventDefault()
		this.form.submit()
	}

	_changeLanguage(name, data) {
		this.props.dispatch(fetchLang(this.props.config.baseUrl, data.value)).then(
			() => this.setState({ [name]: Object.assign({}, this.state[name], data) })
		)
	}

	_changeInput(name, data = {}) {
		this.setState({
			[name]: Object.assign({}, this.state[name], data)
		})
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.step == 2 && this.props.installed != true) {
			this._install()
		}
	}

	_install() {
		this.props.dispatch(postConfig(this.props.config.baseUrl, {
			language: this.state.language.value, 
			login: this.state.login.value, 
			password: this.state.password.value, 
			storageType: this.state.storageType.value, 
			db_name: this.state.db_name.value, 
			db_login: this.state.db_login.value, 
			db_password: this.state.db_password.value, 
			db_host: this.state.db_host.value, 
			db_prefix: this.state.db_prefix.value
		}))
	}

	_stepChanged(value) {
		const { step } = this.state

		if (step < value) {
			switch(step) {
				case 0:
					this.setState({
						login: {...this.state.login, validate: true}, 
						password: {...this.state.password, validate: true}
					}, () => {
						if (this.state.login.error == '' && this.state.password.error == '') {
							this.setState({
								step: value
							})
						}
					})
					break
				case 1:
					if (this.state.storageType.value == 'mysql') {
						this.setState({
							db_name: {...this.state.db_name, validate: true}, 
							db_login: {...this.state.db_login, validate: true}, 
							db_host: {...this.state.db_host, validate: true}
						}, () => {
							if (this.state.db_name.error == '' && this.state.db_login.error == '' && this.state.db_host.error == '') {
								this.props.dispatch(checkMySQL(this.props.config.baseUrl, {
									db_name: this.state.db_name.value, 
									db_login: this.state.db_login.value, 
									db_password: this.state.db_password.value, 
									db_host: this.state.db_host.value, 
									db_prefix: this.state.db_prefix.value
								})).then((result) => {
									const data = result.value.data
									if (data !== true) {
										for (var key in data) {
											this.setState({
												[key]: Object.assign({}, this.state[key], data[key])
											})
										}
									} else {
										this.setState({
											step: value
										})
									}
								})
							}
						})
					} else {
						this.setState({
							step: value
						})
					}
					break
				default:
					break
			}
		} else {
			this.setState({
				step: value
			})
		}
	}

	render() {
		const { lang, vocabularies, currentLang, installed } = this.props
		const { step, language, login, password, storageType, db_name, db_login, db_password, db_host, db_prefix } = this.state

		const storageTypeValue = {
			json: _t(lang, "storage_type_2"), 
			mysql: _t(lang, "storage_type_1")
		}
		
		let db_class = ""
		if (this.state.storageType.value == 'mysql') {
			db_class = "s-is--visible"
		}
		
		let finisNav = false
		let lastStep = <div className='s-h-center'><p>{_t(lang, "install_loading")}</p><Loader /></div>
		if (installed == true) {
			lastStep = <div className='s-h-center'>
				<h1>{_t(lang, "install_done_header")}</h1>
				<h3>{_t(lang, "install_done_subheader")}</h3>
				<p>{_t(lang, "install_done_text")}</p><br/>
				<Button className='s-button--green' clickAction={this._submitHandler.bind(this)} text={_t(lang, "done")} />
				</div>
		} else {
			lastStep = <div className="s-h-center">
				<p className="s-install__error">{_t(lang, installed)}</p>
				<Button clickAction={this._install.bind(this)} text={_t(lang, "retry")} />
			</div>
		}

		return (
			<div className='s-form__bg s-install'>
				<form method="POST" action={this.props.config.baseUrl+'admin'} ref={(form) => { this.form = form; }} className="s-form s-install__form" autoComplete="new-password">
					<div className="s-logo">
						<SVG glyph='logo' className='s-logo__glyph' width={120} height={80} />
						<div className="s-logo__desc">{_t(lang, "install")}</div>
					</div>
					<Steps selected={step} stepChange={this._stepChanged.bind(this)}>
						<Step label={_t(lang, "install_step_1")}>
							<Input type='select'
								label={_t(lang, "language")} 
								id='language' 
								name='language' 
								value={vocabularies} 
								error={language.error} 
								inputChange={this._changeLanguage.bind(this)} 
								selected={language.value} /> <br/>
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
						</Step>
						<Step label={_t(lang, "install_step_2")}>
							<Input type='select'
								label={_t(lang, "storage_type")} 
								id='storageType' 
								name='storageType' 
								value={storageTypeValue} 
								error={storageType.error} 
								inputChange={this._changeInput.bind(this)} 
								selected={storageType.value} /> <br/>
							<div className={"s-install__tab "+db_class}>
								<Input 
									type='text' 
									label={_t(lang, "db_name")} 
									id='db_name' 
									name='db_name' 
									value={db_name.value} 
									error={_t(lang, db_name.error)} 
									inputChange={this._changeInput.bind(this)}
									isRequired
									validate={db_name.validate} /> <br/>
								<Input 
									type='text' 
									label={_t(lang, "db_login")} 
									id='db_login' 
									name='db_login' 
									value={db_login.value} 
									error={_t(lang, db_login.error)} 
									inputChange={this._changeInput.bind(this)}
									isRequired
									validate={db_login.validate} /> <br/>
								<Input 
									type='password' 
									label={_t(lang, "db_password")} 
									id='db_password' 
									name='db_password' 
									value={db_password.value} 
									error={_t(lang, db_password.error)} 
									inputChange={this._changeInput.bind(this)}
									validate={db_password.validate} /> <br/>
								<Input 
									type='text' 
									label={_t(lang, "db_host")} 
									id='db_host' 
									name='db_host' 
									value={db_host.value} 
									error={_t(lang, db_host.error)} 
									inputChange={this._changeInput.bind(this)}
									isRequired
									validate={db_host.validate} /> <br/>
								<Input 
									type='text' 
									label={_t(lang, "db_prefix")} 
									id='db_prefix' 
									name='db_prefix' 
									value={db_prefix.value} 
									error={_t(lang, db_prefix.error)} 
									inputChange={this._changeInput.bind(this)} />
							</div>
						</Step>
						<Step label={_t(lang, "install_step_3")} nav={finisNav}>
							{lastStep}
						</Step>
					</Steps>
				</form>
			</div>
		)
	}
}