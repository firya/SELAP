import cookie from 'react-cookie'

export default function reducer(state={
		user: {}, 
		error: null
	}, action) {
	const payload = action.payload

	switch (action.type) {
		case "SIGNIN_PENDING": {
			return {...state}
		}
		case "SIGNIN_REJECTED": {
			return {...state, error: payload.data}
		}
		case "SIGNIN_FULFILLED": {
			cookie.save('token', payload.data.token, { path: '/' })
			return {...state, user: Object.assign({}, state.user, payload.data)}
		}
		case "GET_TOKEN_FULFILLED": {
			if (!payload.data) {
				cookie.remove('token', { path: '/' })
				return {...state, user: {}}
			} else {
				return {...state, user: Object.assign({}, state.user, payload.data)}
			}
		}
		case "EXIT": {
			cookie.remove('token', { path: '/' })
			window.location.reload()
			return {...state, user: {}}
		}
	}
	return state;
}