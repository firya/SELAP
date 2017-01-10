import axios from "axios"

export function getVariables(baseUrl, token) {
	return (dispatch) => {
		return dispatch({
			type: "FETCH_VARIABLES", 
			payload: axios({
				method: 'get',
				url: baseUrl+"admin/api/getVariables",
			})
		})
	}
}
export function postVariables(baseUrl, token, data) {
	return (dispatch) => {
		return dispatch({
			type: "SEND_VARIABLES", 
			payload: axios({
				method: 'post',
				url: baseUrl+"admin/api/setVariables",
				data
			})
		})
	}
}