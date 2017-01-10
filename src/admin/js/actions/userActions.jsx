import axios from "axios"

/*export function signIn(baseUrl, data = {}) {
	return {
		type: "SIGNIN", 
		payload: axios.post(baseUrl+"admin/api/signin", data)
	}
}*/

export function signIn(baseUrl, data = {}) {
	return {
		type: "SIGNIN", 
		payload: axios({
			method: 'post',
			url: baseUrl+"admin/api/signin",
			data: data
		})
	}
}

export function getNewToken(baseUrl, token) {
	token = {
		token: token
	}
	return {
		type: "GET_TOKEN", 
		payload: axios({
			method: 'post',
			url: baseUrl+"admin/api/renewToken",
			data: token
		})
	}
}

export function logout(baseUrl, token) {
	return {
		type: "EXIT", 
		payload: ""
	}
}