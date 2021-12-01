import axios from 'axios'
import { CLIENT_DETAILS_REQUEST, CLIENT_DETAILS_SUCCESS, CLIENT_DETAILS_FAIL,
		 CLIENT_CREATE_REQUEST, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_FAIL,
		 MANUFACTURER_DETAILS_REQUEST, MANUFACTURER_DETAILS_SUCCESS, MANUFACTURER_DETAILS_FAIL,
		 MANUFACTURER_CREATE_REQUEST, MANUFACTURER_CREATE_SUCCESS, MANUFACTURER_CREATE_FAIL,
		 MANUFACTURER_DELETE_REQUEST ,MANUFACTURER_DELETE_SUCCESS ,MANUFACTURER_DELETE_FAIL,
		 SUPPLIER_DETAILS_REQUEST, SUPPLIER_DETAILS_SUCCESS, SUPPLIER_DETAILS_FAIL,
		 SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_SUCCESS, SUPPLIER_CREATE_FAIL,
		 SUPPLIER_DELETE_REQUEST ,SUPPLIER_DELETE_SUCCESS ,SUPPLIER_DELETE_FAIL,	 
		} from '../constants/clientConstants'


//get users
export const listClients = () =>  async(dispatch, getState) => {
	try{
		dispatch({ type: CLIENT_DETAILS_REQUEST })

		const { userLogin: { userInfo } } = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.get('/client/clientlist', config)

		dispatch({
			type: CLIENT_DETAILS_SUCCESS,
			payload: data
		})


	} catch(error) {
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: CLIENT_DETAILS_FAIL,
	          payload: message,
	        })

	}
}

//add user
export const createUser = (user) => async(dispatch, getState) => {
	try{
		dispatch({ type: CLIENT_CREATE_REQUEST })

		const { userLogin:{ userInfo } } = getState()

		const config = {
			headers: {
			 	'Content-Type': 'application/json',
			 	Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.post('/client', user, config)

		dispatch({
			type: CLIENT_CREATE_SUCCESS,
			payload: data
		})

	} catch(error){
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: CLIENT_CREATE_FAIL,
	          payload: message,
	        })
	}
}

//get manufacturer
export const listManufacturers = () =>  async(dispatch, getState) => {
	try{
		dispatch({ type: MANUFACTURER_DETAILS_REQUEST })

		const { userLogin: { userInfo } } = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.get('/client/manufacturer', config)

		dispatch({
			type: MANUFACTURER_DETAILS_SUCCESS,
			payload: data
		})


	} catch(error) {
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: MANUFACTURER_DETAILS_FAIL,
	          payload: message,
	        })

	}
}


//add Manufacturer
export const createManufacturer = (manufacturer) => async(dispatch, getState) => {
	try{
		dispatch({ type: MANUFACTURER_CREATE_REQUEST })

		const { userLogin:{ userInfo } } = getState()

		const config = {
			headers: {
			 	'Content-Type': 'application/json',
			 	Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.post('/client/manufacturer', manufacturer, config)

		dispatch({
			type: MANUFACTURER_CREATE_SUCCESS,
			payload: data
		})

	} catch(error){
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: MANUFACTURER_CREATE_FAIL,
	          payload: message,
	        })
	}
}


//delete manfacturer
export const deleteManfacturer = (id) => async(dispatch, getState) => {
	try{
		dispatch({ type: MANUFACTURER_DELETE_REQUEST })

		const { userLogin: {userInfo}, } = getState()

		const config = {
						 headers: {
							'Content-Type' : 'application/json',								 
					         Authorization: `Bearer ${userInfo.token}`,
					      },
					} 

		await axios.delete(`/client/manufacturer/${id}`, config)

		dispatch({ type: MANUFACTURER_DELETE_SUCCESS })
		
	} catch(error){
			const message =
		      error.response && error.response.data.message
		        ? error.response.data.message
		        : error.message
		    
		    dispatch({
		      type: MANUFACTURER_DELETE_FAIL,
		      payload: message,
		    })
	}
}


//get supplier
export const listSupplier = () =>  async(dispatch, getState) => {
	try{
		dispatch({ type: SUPPLIER_DETAILS_REQUEST })

		const { userLogin: { userInfo } } = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.get('/client/supplier', config)

		dispatch({
			type: SUPPLIER_DETAILS_SUCCESS,
			payload: data
		})


	} catch(error) {
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: SUPPLIER_DETAILS_FAIL,
	          payload: message,
	        })

	}
}


//add Supplier
export const createSupplier = (supplier) => async(dispatch, getState) => {
	try{
		dispatch({ type: SUPPLIER_CREATE_REQUEST })

		const { userLogin:{ userInfo } } = getState()

		const config = {
			headers: {
			 	'Content-Type': 'application/json',
			 	Authorization: `Bearer ${userInfo.token}`
			}
		}

		const { data } = await axios.post('/client/supplier', supplier, config)

		dispatch({
			type: SUPPLIER_CREATE_SUCCESS,
			payload: data
		})

	} catch(error){
		const message =
	          error.response && error.response.data.message
	            ? error.response.data.message
	            : error.message
	        
	        dispatch({
	          type: SUPPLIER_CREATE_FAIL,
	          payload: message,
	        })
	}
}

//delete supplier
export const deleteSupplier = (id) => async(dispatch, getState) => {
	try{
		dispatch({ type: SUPPLIER_DELETE_REQUEST })

		const { userLogin: {userInfo}, } = getState()

		const config = {
						 headers: {
							'Content-Type' : 'application/json',								 
					         Authorization: `Bearer ${userInfo.token}`,
					      },
					} 

		await axios.delete(`/client/supplier/${id}`, config)

		dispatch({ type: SUPPLIER_DELETE_SUCCESS })
		
	} catch(error){
			const message =
		      error.response && error.response.data.message
		        ? error.response.data.message
		        : error.message
		    
		    dispatch({
		      type: SUPPLIER_DELETE_FAIL,
		      payload: message,
		    })
	}
}