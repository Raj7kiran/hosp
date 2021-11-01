import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { locationListReducer, locationCreateReducer, locationDeleteReducer } from './reducers/adminReducers'

const reducer = combineReducers({
	userLogin: userLoginReducer,
	userDetails: userDetailsReducer,
	locationsList: locationListReducer,
	locationCreate: locationCreateReducer,
	userUpdateProfile: userUpdateProfileReducer,
	locationDelete: locationDeleteReducer
})


const userInfoFromStorage = localStorage.getItem('userInfo')
							 ? JSON.parse(localStorage.getItem('userInfo'))
							 : null

const initialState = {
	userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]


const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
	)


export default store