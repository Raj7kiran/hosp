import React, { useState, useEffect } from 'react'

import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


const LoginScreen = ({ location, history }) => {
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const redirect = location.search? location.search.split('=')[1] : '/'

	useEffect(() => {
		if(userInfo){
			history.push('redirect')
		}
	},[history, userInfo, redirect])


	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}
	
	
	return (
		<>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}	
			{userInfo ? ('')
			  : (
					<FormContainer>							
					<h1>Login</h1>	
						
					<Form onSubmit={submitHandler} className='py-3'>
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
								<Form.Control type= 'email'
											  placeholder='Enter email'
											  value = {email}
											  onChange = {(e) => setEmail(e.target.value)}																				
								>
								</Form.Control>
						</Form.Group>

						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
								<Form.Control 	type= 'password'
												placeholder='Enter password'
												value = {password}								
												onChange = {(e) => setPassword(e.target.value)}
								>
								</Form.Control>
						</Form.Group>
						<Button type='submit' variant='primary'>
							Login
						</Button>
					</Form>
					
				</FormContainer>
				
		  	)}
		
		</>
		)
}


export default LoginScreen