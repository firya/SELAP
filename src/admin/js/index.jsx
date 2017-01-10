import React from 'react'
import { render } from 'react-dom'
import { Provider } from "react-redux"

import App from './app.jsx'

import store from './store.jsx'

render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('selap'));