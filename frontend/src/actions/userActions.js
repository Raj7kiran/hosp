import axios from 'axios'
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT,
		 USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, 
		} from '../constants/userConstants'




export const login = (email, password) => async(dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST
		})

		const config ={
				headers : {	'Content-Type' : 'application/json'	}
			}

		const { data } = await axios.post('/users/login',{email, password}, config )

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data
		})
	} catch(error){
		dispatch({
			type: USER_LOGIN_FAIL,
			payload: error.response && error.response.data.message
					 ? error.response.data.message
					 : error.message
		})
	}
}


export const logout = () => (dispatch) => {
	dispatch({ type: USER_LOGOUT })
	document.location.href='/'
}


export const getUserDetails = (id) => async(dispatch, getState) => {
	try{
		dispatch({
			type: USER_DETAILS_REQUEST
		})

		const { userLogin: { userInfo } } = getState()

		const { data } = await axios.get(`/users/${id}`)

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data
		})

	} catch(error) {
		const message =
	      error.response && error.response.data.message
	        ? error.response.data.message
	        : error.message
	    dispatch({
	      type: USER_DETAILS_FAIL,
	      payload: message,
	  })
	}
}