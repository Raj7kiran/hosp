import React from 'react'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap'


const AddUser = ({ admin }) => {
	return(
		<>
		<h1>Add User</h1>
				<Form >
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
								<Form.Control type= 'text'
												placeholder='Enter name'
												>
								</Form.Control>
						</Form.Group>

						<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
							<Form.Control type= 'email'
											placeholder='Enter mail'
											>
							</Form.Control>
					</Form.Group>
					{admin == 1 && (
							<Form.Group controlId='iaAdmin'>
								<Form.Label>Is the user a Admin?</Form.Label>
								<InputGroup className="mb-3">
								    <InputGroup.Checkbox aria-label="Checkbox for following text input" />
									 <FormControl aria-label="Text input with checkbox" />
								</InputGroup>
							</Form.Group>
						)}				


						<Button type='submit' variant='primary'>
							Add
						</Button>
					</Form>
					</>			
		)
}

export default AddUser