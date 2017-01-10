export default function reducer(state={
		config: {}, 
		installed: false, 
		error: null
	}, action) {
	switch (action.type) {
		case "POST_CONFIG_PENDING":  {
			return {...state}
		}
		case "POST_CONFIG_REJECTED": {
			return {...state, error: action.payload}
		}
		case "POST_CONFIG_FULFILLED": {
			return {...state, installed: action.payload.data}
		}
		case "GET_BASE_URL": {
			return {...state, config: Object.assign({}, state.config, action.payload)}
		}
		case "CHECK_MYSQL_FULFILLED": {
			return {...state}
		}
	}
	return state;
}