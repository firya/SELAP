import axios from "axios"

export function postConfig(baseUrl, data = {}) {
	return (dispatch) => {
		return dispatch({
			type: "POST_CONFIG", 
			payload: axios({
				method: 'post',
				url: baseUrl+"admin/api/postConfig",
				data: data
			})
		})
	}
}

export function checkMySQL(baseUrl, data = {}) {
	return (dispatch) => {
		return dispatch({
			type: "CHECK_MYSQL", 
			payload: axios({
				method: 'post',
				url: baseUrl+"admin/api/checkMySQL",
				data: data
			})
		})
	}
}

export function getBaseUrl() {
	var baseUrl = document.location.pathname
	const strpos = baseUrl.indexOf('admin/');
	baseUrl = baseUrl.substr(0, strpos);
	return {
		type: "GET_BASE_URL",
		payload: {
			baseUrl
		}
	}
}