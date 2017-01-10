export default function reducer(state={
		variables: {}, 
		error: null
	}, action) {
	switch (action.type) {
		case "FETCH_VARIABLES_FULFILLED": {
			return {...state, variables: action.payload.data}
		}
		case "SEND_VARIABLES_PENDING": {
			return {...state}
		}
	}
	return state;
}