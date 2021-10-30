import React from 'react'

import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'



const UpdateProfileScreen = () => {
	return(
		<FormContainer>
			<h1>Update Profile</h1>
			<Form>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
						<Form.Control type='text' placeholder='Enter Name'>
						</Form.Control>
						<Form.Label>Email Address</Form.Label>
							<Form.Control type= 'email'
											placeholder='Enter mail'
											>
							</Form.Control>
					
					<Form.Label>Enter Password</Form.Label>
							<Form.Control type= 'password'
											placeholder='Enter password'
											>
							</Form.Control>
					</Form.Group>
				<Button>Update</Button>
				
			</Form>
		</FormContainer>
		)
}


export default UpdateProfileScreen