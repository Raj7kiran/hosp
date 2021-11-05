import axios from 'axios'
import { LOCATION_DETAILS_REQUEST ,LOCATION_DETAILS_SUCCESS ,LOCATION_DETAILS_FAIL,
		 LOCATION_CREATE_REQUEST ,LOCATION_CREATE_SUCCESS ,LOCATION_CREATE_FAIL,
		 LOCATION_DELETE_REQUEST ,LOCATION_DELETE_SUCCESS ,LOCATION_DELETE_FAIL
		 } from '../constants/adminConstants'


export const listLocations = () => async(dispatch, getState) => {
	try{
		dispatch({ type: LOCATION_DETAILS_REQUEST })

		const { userLogin: {userInfo}, } = getState()

		const config = {
						 headers: {
															 
					         Authorization: `Bearer ${userInfo.token}`,
					      },
					} 

		const { data } = await axios.get('/admin/locations', config)

		console.log(data)

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


export const createLocation = (location) =>  async(dispatch, getState) => {
	try {
		dispatch({ type: LOCATION_CREATE_REQUEST })

		const { userLogin: {userInfo}, } = getState()

		const config = {
						 headers: {
							'Content-Type' : 'application/json',								 
					         Authorization: `Bearer ${userInfo.token}`,
					      },
					} 

		const { data } = await axios.post('/admin/createlocation', location, config)
		
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


export const deleteLocation = (id) => async(dispatch, getState) => {
	try{
		dispatch({ type: LOCATION_DELETE_REQUEST })

		const { userLogin: {userInfo}, } = getState()

		const config = {
						 headers: {
							'Content-Type' : 'application/json',								 
					         Authorization: `Bearer ${userInfo.token}`,
					      },
					} 

		await axios.delete(`/admin/locations/${id}`, config)

		dispatch({ type: LOCATION_DELETE_SUCCESS })
		
	} catch(error){
			const message =
		      error.response && error.response.data.message
		        ? error.response.data.message
		        : error.message
		    
		    dispatch({
		      type: LOCATION_DELETE_FAIL,
		      payload: message,
		    })
	}
}


