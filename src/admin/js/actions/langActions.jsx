import React from 'react'
import axios from "axios"

export function fetchLang(baseUrl, lang = "en") {
	return (dispatch) => {
		return dispatch({
			type: "FETCH_LANG", 
			payload: axios.get(baseUrl+"admin/api/getVocabulary?lang="+lang)
		})
	}
}

export function _t(lang, key) {
	let sentence = key
	var newlineRegex = /(\r\n|\n\r|\r|\n)/g

	if (lang !== undefined) {
		if (key == '') {
			sentence = ''
		} else {
			if (lang[key] !== undefined) {
				sentence = lang[key]
			}
		}
	}

	return sentence
}