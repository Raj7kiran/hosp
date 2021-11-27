import { CLIENT_DETAILS_REQUEST, CLIENT_DETAILS_SUCCESS, CLIENT_DETAILS_FAIL,
		 CLIENT_CREATE_REQUEST, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_FAIL, CLIENT_CREATE_RESET,
		 MANUFACTURER_DETAILS_REQUEST, MANUFACTURER_DETAILS_SUCCESS, MANUFACTURER_DETAILS_FAIL,
		 MANUFACTURER_CREATE_REQUEST, MANUFACTURER_CREATE_SUCCESS, MANUFACTURER_CREATE_FAIL, MANUFACTURER_CREATE_RESET,
 } from '../constants/clientConstants'



export const clientListReducer = (state={ users:[] }, action) => {
	switch(action.type){
		case CLIENT_DETAILS_REQUEST:
			return { loading: true, users: [] }
		case CLIENT_DETAILS_SUCCESS:
			return { loading: false, users: action.payload }
		case CLIENT_DETAILS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}


export const clientCreateReducer = (state={}, action) => {
	switch(action.type){
		case CLIENT_CREATE_REQUEST:
			return { loading: true }
		case CLIENT_CREATE_SUCCESS:
			return { loading: false, success: true, user: action.payload }
		case CLIENT_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case CLIENT_CREATE_RESET:
			return {}
		default:
			return state
	}
}


export const manufacturerListReducer = ( state={ manufacturers:[] }, action ) => {
	switch(action.type){
		case MANUFACTURER_DETAILS_REQUEST:
			return { loading: true, manufacturers:[] }
		case MANUFACTURER_DETAILS_SUCCESS:
		 	return { loading: false, manufacturers: action.payload }
		 case MANUFACTURER_DETAILS_FAIL:
		 	return { loading: false, error: action.payload }
		 default:
		 	return state
	}
}

export const manufacturerCreateReducer = (state={}, action) => {
	switch(action.type){
		case MANUFACTURER_CREATE_REQUEST:
			return { loading: true }
		case MANUFACTURER_CREATE_SUCCESS:
			return { loading: false, success: true, user: action.payload }
		case MANUFACTURER_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case MANUFACTURER_CREATE_RESET:
			return {}
		default:
			return state
	}
}
