import { LOCATION_DETAILS_REQUEST ,LOCATION_DETAILS_SUCCESS ,LOCATION_DETAILS_FAIL,
		 LOCATION_CREATE_REQUEST ,LOCATION_CREATE_SUCCESS ,LOCATION_CREATE_FAIL,
		 LOCATION_DELETE_REQUEST ,LOCATION_DELETE_SUCCESS ,LOCATION_DELETE_FAIL, LOCATION_DELETE_RESET
		 } from '../constants/adminConstants'


//location listing
export const locationListReducer = (state={ locations:[] }, action) => {
	switch(action.type){
		case LOCATION_DETAILS_REQUEST:
			return { loading: true, locations:[] }
		case LOCATION_DETAILS_SUCCESS:
		 	return { loading: false, locations: action.payload }
		 case LOCATION_DETAILS_FAIL:
		 	return { loading:false, error: action.payload }
		default:
			return state
	}
}


//create location
export const locationCreateReducer = (state={}, action) => {
	switch(action.type){
	case LOCATION_CREATE_REQUEST:
		return { loading: true }
	case LOCATION_CREATE_SUCCESS:
	 	return { loading: false, success: true, location: action.payload }
	 case LOCATION_CREATE_FAIL:
	 	return { loading: false, error: action.payload }
	 default:
	 	return state

	}
}


//delete location
export const locationDeleteReducer = ( state={}, action ) => {
	switch(action.type){
		case LOCATION_DETAILS_REQUEST:
			return{ loading: true }
		case LOCATION_DETAILS_SUCCESS:
			return { loading: false, success: true }
		case LOCATION_DELETE_FAIL:
			return { loading: false, error: action.payload }
		case LOCATION_DELETE_RESET:
			return { success: false }
		default:
			return state

	}
}