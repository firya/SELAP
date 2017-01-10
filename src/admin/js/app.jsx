import React from 'react'
import { connect } from "react-redux"
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createHistory, useBasename } from 'history'
import cookie from 'react-cookie'
import jwt from 'jsonwebtoken'

import Variables from './pages/Variables.jsx'
import Login from './pages/Login.jsx'
import Settings from './pages/Settings.jsx'
import Structure from './pages/Structure.jsx'
import Editor from './pages/Editor.jsx'
import Mail from './pages/Mail.jsx'
import Install from './pages/Install.jsx'
import Layout from './pages/Layout.jsx'

import Loader from './components/loader.jsx'

import { getNewToken } from "./actions/userActions.jsx"
import { fetchLang } from "./actions/langActions.jsx"
import { getBaseUrl, fetchConfig } from './actions/configActions.jsx'

@connect((store) => {
	return {
		config: store.config.config
	}
})

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.baseUrl = ''
	}
	componentDidMount() {
		this.baseUrl = this.props.dispatch(getBaseUrl()).payload.baseUrl

		this.props.dispatch(fetchLang(this.baseUrl))
		
		this.history = useBasename(createHistory)({
			basename: this.baseUrl+'admin'
		})

		this.checkTime = 15*60 //seconds

		this._checkToken()
	}

	_checkToken() {
		const token = cookie.load('token')
		
		let currentLocation = location.pathname.split('/')
		currentLocation = currentLocation[currentLocation.length - 1]

		if (token !== 'undefined' && token) {
			if (currentLocation == 'login') {
				this.history.replace('/')
			}

			const now = new Date().getTime()/1000
			const tokenData = jwt.decode(token)

			
			if (tokenData.expires - now < 0) {
				this.history.replace('/login')
				cookie.remove('token', { path: '/' });
			} else if (tokenData.expires - now < this.checkTime + 15*60 + 60) {
				this.props.dispatch(getNewToken(this.baseUrl, token))
			} else {
				setTimeout(() => this._checkToken(), this.checkTime*1000)
			}
		} else {
			if (currentLocation !== 'install') {
				this.history.replace('/login')
			}
		}
	}

	render() {
		const { config } = this.props

		if (!config.baseUrl) {
			return (
				<Loader />
			)
		} else {
			return (
				<Router key={Math.random()} history={this.history}>
					<Route path="/" component={Layout}>
						<IndexRoute component={Variables} />
						<Route path="/variables" component={Variables}/>
						<Route path="/settings" component={Settings}/>
						<Route path="/structure" component={Structure}/>
						<Route path="/editor" component={Editor}/>
						<Route path="/mail" component={Mail}/>
					</Route>
					<Route path="/login" component={Login}/>
					<Route path="/install" component={Install}/>
				</Router>
			)
		}
	}
}