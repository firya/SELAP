export default function reducer(state={
		lang: {}, 
		vocabularies: {}, 
		current: '', 
		fetching: false,
		fetched: false, 
		error: null
	}, action) {
	switch (action.type) {
		case "FETCH_LANG_PENDING": {
			return {...state, fetching: true, fetched: false}
		}
		case "FETCH_LANG_REJECTED": {
			return {...state, fetching: false, fetched: false, error: action.payload}
		}
		case "FETCH_LANG_FULFILLED": {
			let data = action.payload.data
			const knownLanguages = {
				ru: "Русский",
				en: "English"
			}
			const voc = data.vocabularies
			let vocObject = {}
			if (voc) {
				for (var i = 0; i < voc.length; i++) {
					let key = voc[i]
					let value = voc[i]
					if (knownLanguages[key]) {
						value = knownLanguages[key]
					}
					vocObject[key] = value
				}
			}
			data.vocabularies = vocObject
			return {...state, lang: data.t, vocabularies: data.vocabularies, current: data.current, fetching: false, fetched: true}
		}
	}
	return state;
}