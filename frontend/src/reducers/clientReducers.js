import { CLIENT_DETAILS_REQUEST, CLIENT_DETAILS_SUCCESS, CLIENT_DETAILS_FAIL,
		 CLIENT_CREATE_REQUEST, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_FAIL, CLIENT_CREATE_RESET,
		 MANUFACTURER_DETAILS_REQUEST, MANUFACTURER_DETAILS_SUCCESS, MANUFACTURER_DETAILS_FAIL,
		 MANUFACTURER_CREATE_REQUEST, MANUFACTURER_CREATE_SUCCESS, MANUFACTURER_CREATE_FAIL, MANUFACTURER_CREATE_RESET,
		 MANUFACTURER_DELETE_REQUEST ,MANUFACTURER_DELETE_SUCCESS ,MANUFACTURER_DELETE_FAIL,
		 SUPPLIER_DETAILS_REQUEST, SUPPLIER_DETAILS_SUCCESS, SUPPLIER_DETAILS_FAIL,
		 SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_SUCCESS, SUPPLIER_CREATE_FAIL, SUPPLIER_CREATE_RESET,
		 SUPPLIER_DELETE_REQUEST ,SUPPLIER_DELETE_SUCCESS ,SUPPLIER_DELETE_FAIL, SUPPLIER_DELETE_RESET
		 
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
			return { loading: false, success: true, manufacturer: action.payload }
		case MANUFACTURER_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case MANUFACTURER_CREATE_RESET:
			return {}
		default:
			return state
	}
}


//delete manufacturer
export const manufacturerDeleteReducer = ( state={}, action ) => {
	switch(action.type){
		case MANUFACTURER_DELETE_REQUEST:
			return{ loading: true }
		case MANUFACTURER_DELETE_SUCCESS:
			return { loading: false, success: true }
		case MANUFACTURER_DELETE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state

	}
}

export const supplierListReducer = ( state={ suppliers:[] }, action ) => {
	switch(action.type){
		case SUPPLIER_DETAILS_REQUEST:
			return { loading: true, suppliers:[] }
		case SUPPLIER_DETAILS_SUCCESS:
		 	return { loading: false, suppliers: action.payload }
		 case SUPPLIER_DETAILS_FAIL:
		 	return { loading: false, error: action.payload }
		 default:
		 	return state
	}
}


export const supplierCreateReducer = (state={}, action) => {
	switch(action.type){
		case SUPPLIER_CREATE_REQUEST:
			return { loading: true }
		case SUPPLIER_CREATE_SUCCESS:
			return { loading: false, success: true, supplier: action.payload }
		case SUPPLIER_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case SUPPLIER_CREATE_RESET:
			return { }
		default:
			return state
	}
}

//delete supplier
export const supplierDeleteReducer = ( state={}, action ) => {
	switch(action.type){
		case SUPPLIER_DELETE_REQUEST:
			return{ loading: true }
		case SUPPLIER_DELETE_SUCCESS:
			return { loading: false, success: true }
		case SUPPLIER_DELETE_FAIL:
			return { loading: false, error: action.payload }
		case SUPPLIER_DELETE_RESET:
			return {}
		default:
			return state

	}
}