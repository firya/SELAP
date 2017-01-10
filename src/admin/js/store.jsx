import { applyMiddleware, createStore } from "redux"
import reducer from './reducers/index.jsx'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

const middleware = applyMiddleware(promise(), thunk, logger())

export default createStore(reducer, middleware)