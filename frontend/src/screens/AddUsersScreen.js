import React, { useState, useEffect } from 'react'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createUser } from '../actions/clientActions'
import { getUserDetails } from '../actions/userActions'
import { CLIENT_CREATE_RESET } from '../constants/clientConstants'
// import AddUser from '../components/AddUser'



const AddUsersScreen = ({history}) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	// const [password, setPassword] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)
	const [isClientAdmin, setIsClientAdmin] = useState(false)
	// const [addedUserId, setAddUserId ] = useState('')

	const dispatch = useDispatch()

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const clientCreate = useSelector(state => state.clientCreate)
	const { loading, success, error } = clientCreate

	// setAddUserId(userInfo._id)

	useEffect(() => {
		dispatch({ type: CLIENT_CREATE_RESET })
		if(success){
			
			history.push('/clientlist')
		} 
			 
	},[success, history])

	const submitHandler = (e) => {
		e.preventDefault()
		console.log('add user')
		dispatch(createUser({name, email, isAdmin, isClientAdmin }))
	}




	return(
		<FormContainer  >
			<h1>Add User</h1>
				{ loading ? <Loader />
					: error ? <Message variant='danger'>{error}</Message>
					: (
						<Form onSubmit={submitHandler} >
							<Form.Group controlId='name'>
								<Form.Label>Name</Form.Label>
									<Form.Control 	type= 'text'
													placeholder='Enter name'
													value= {name}
													onChange = {(e) => setName(e.target.value)}
													>
									</Form.Control>
							</Form.Group>

							<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
								<Form.Control type= 'email'
												placeholder='Enter email'
												value= {email}
												onChange = {(e) => setEmail(e.target.value)}
												>
								</Form.Control>
							</Form.Group>
							{ userInfo.isAdmin && (
									<>
									<Form.Group controlId='isAdmin'>
										<Form.Label>Is the user a Admin?</Form.Label>
										<InputGroup className="mb-3">
											    <InputGroup.Checkbox 	aria-label="Checkbox for following text input"
											    						aria-label="Checkbox for following text input"
											    						checked={isAdmin}
											    						onChange = { (e) => setIsAdmin(e.target.checked)}
											     />
											 <FormControl aria-label="Text input with checkbox" />
										</InputGroup>
									</Form.Group>

									<Form.Group controlId='isClientAdmin'>
										<Form.Label>Is the user a Client Admin?</Form.Label>
										<InputGroup className="mb-3">
											    <InputGroup.Checkbox 	aria-label="Checkbox for following text input"
											    						checked={isClientAdmin}
											    						onChange = { (e) => setIsClientAdmin(e.target.checked) }
											     />
											 <FormControl aria-label="Text input with checkbox" />
										</InputGroup>
									</Form.Group>
									</>
								) }
							{/*{ userInfo.isAdmin && (

								) }*/}
							{ userInfo.isClientAdmin && (
									<Form.Group controlId='isClientAdmin'>
										<Form.Label>Is the user a Client Admin?</Form.Label>
										<InputGroup className="mb-3">
											    <InputGroup.Checkbox 	aria-label="Checkbox for following text input"
											    						checked={isClientAdmin}
											    						onChange = { (e) => setIsClientAdmin(e.target.checked) }
											     />
											 <FormControl aria-label="Text input with checkbox" />
										</InputGroup>
									</Form.Group>
								) }
											


							<Button type='submit' variant='primary'>
								Add
							</Button>
					</Form>
						) }
				
		</FormContainer>

		)
}

export default AddUsersScreen