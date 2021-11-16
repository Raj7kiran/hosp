import axios from 'axios'
import { CLIENT_DETAILS_REQUEST, CLIENT_DETAILS_SUCCESS, CLIENT_DETAILS_FAIL,
		 CLIENT_CREATE_REQUEST, CLIENT_CREATE_SUCCESS, CLIENT_CREATE_FAIL
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