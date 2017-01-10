import { combineReducers } from "redux"

import config from "./config.jsx"
import user from "./user.jsx"
import lang from "./lang.jsx"
import variables from "./variables.jsx"

export default combineReducers({
	config, 
	user, 
	lang, 
	variables
})