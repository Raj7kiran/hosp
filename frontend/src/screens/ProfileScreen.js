import React, { useState, useEffect } from 'react'
import { Form,Button, Row, Col } from 'react-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'


const ProfileScreen = ({ location, history }) => {
	const [ name, setName ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ confirmPassword, setConfirmPassword ] = useState('')
	const [ message, setMessage ] = useState(null)

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails
	

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if(!userInfo){
			history.push('/')
		} else {
			if(!user || !user.name){
				dispatch(getUserDetails('profile'))
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	},[dispatch, history, userInfo, user])

	const submitHandler = (e) => {
		e.preventDefault()
		if(password !== confirmPassword){
			setMessage('Passwords does not match')
		} else {
			console.log('Update Request')
		}
		
	}


	return (
		<>
			<h1>Profile</h1>
			{/*<Row className='align-items-center'>
				<Col>
					<h1>Profile</h1>
				</Col>
				<Col className='text-right my-3'>
					<Link className='btn btn-primary' to='/updateprofile'>Update Profile</Link>
				</Col>
			</Row>*/}
			<Row>
				<Col md={6}>
				{error && <Message variant='danger'>{error}</Message>}
				{ loading ? (<Loader />)
				  : error ? (<Message variant='danger'>{error}</Message>)
				  : (
				  		<Form onSubmit={submitHandler} >
							<Form.Group controlId='name'>
								<Form.Label>Name</Form.Label>
									<Form.Control type= 'name'
													placeholder='Enter name'
													value={name}
													onChange = {(e)=> setName(e.target.value)}
									>
									</Form.Control>
							</Form.Group>

							<Form.Group controlId='email'>
								<Form.Label>Email Address</Form.Label>
									<Form.Control type= 'email'
													placeholder='Enter mail'
													value={email}
													onChange = {(e)=> setEmail(e.target.value)}
									>
									</Form.Control>
							</Form.Group>

							<Form.Group controlId='password'>
								<Form.Label>Password</Form.Label>
									<Form.Control type= 'password'
													placeholder='Enter password'
													value={password}
													onChange = {(e)=> setPassword(e.target.value)}
									>
									</Form.Control>
							</Form.Group>

							<Form.Group controlId='confirmPassword'>
								<Form.Label>Confirm Password</Form.Label>
									<Form.Control type= 'password'
													placeholder='Confirm password'
													value={confirmPassword}
													onChange = {(e)=> setConfirmPassword(e.target.value)}
									>
									</Form.Control>
							</Form.Group>

							<Button type='submit' variant='primary'>
								Update
							</Button>
						</Form>
				  	)}
					
				</Col>
			</Row>
					
         </>
		)
}

export default ProfileScreen