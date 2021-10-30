import axios from 'axios'
import { LOCATION_DETAILS_REQUEST ,LOCATION_DETAILS_SUCCESS ,LOCATION_DETAILS_FAIL,
		 LOCATION_CREATE_REQUEST ,LOCATION_CREATE_SUCCESS ,LOCATION_CREATE_FAIL
		 } from '../constants/adminConstants'


export const listLocations = () => async(dispatch) => {
	try{
		dispatch({ type: LOCATION_DETAILS_REQUEST })

		const { data } = await axios.get('/admin/master')

		console.log(...data)

		dispatch({
			type: LOCATION_DETAILS_SUCCESS,
			payload: data
		})
	} catch(error) {
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: LOCATION_DETAILS_FAIL,
	          payload: message,
	        })
	}
}


export const createLocation = () =>  async(dispatch, getState) => {
	try {
		dispatch({ type: LOCATION_CREATE_REQUEST })

		const { userLogin: {userInfo}, } = getState()

		const { data } = await axios.post('/admin/createlocation', {})
		
		dispatch({
			type: LOCATION_CREATE_SUCCESS,
			payload: data
		})		

	} catch(error){
		const message =
	      error.response && error.response.data.message
	        ? error.response.data.message
	        : error.message
		    
		    dispatch({
		      type: LOCATION_CREATE_FAIL,
		      payload: message,
		    })
	}
}


