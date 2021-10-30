import React, { useState, useEffect } from 'react'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { createLocation } from '../actions/adminActions'


const AddLocation = ({history}) => {
	const [ country, setCountry ] = useState('')
	const [ city, setCity ] = useState('')
	const [ stat, setStat ] = useState('')

	const dispatch = useDispatch()

	const locationCreate = useSelector(state => state.locationCreate)
	const { loading, error, success} = locationCreate

	useEffect(()=>{
		if(success){
			history.push('/admin/master')
		} 
	},[history, success])



	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(createLocation({
			country,
			stat,
			city
		}))
	}


	return(
		<>
		<h1>Add Location</h1>
			<Link to='/admin/master' className='btn btn-dark my-3'>
					Go Back
			</Link>
				<Form onSubmit={submitHandler} >
						<Form.Group controlId='country'>
							<Form.Label>Country</Form.Label>
								<Form.Control type= 'text'
												placeholder='Enter Country'
												value={country}
												onChange = {(e) => setCountry(e.target.value) }
												>
								</Form.Control>
						</Form.Group>

						<Form.Group controlId='state'>
							<Form.Label>State</Form.Label>
								<Form.Control type= 'text'
												placeholder='Enter State'
												value={stat}
												onChange = {(e) => setStat(e.target.value) }
												>
								</Form.Control>
						</Form.Group>

						<Form.Group controlId='city'>
							<Form.Label>City</Form.Label>
								<Form.Control type= 'text'
												placeholder='Enter City'
												value={city}
												onChange = {(e) => setCity(e.target.value) }
												>
								</Form.Control>
						</Form.Group>					


						<Button type='submit' variant='primary'>
							Add
						</Button>
					</Form>
					</>			
		)
}

export default AddLocation