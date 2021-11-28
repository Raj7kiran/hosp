import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Table, Row, Col, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getCountry} from '../actions/dropActions'
import {listManufacturers, createManufacturer} from '../actions/clientActions'
import { MANUFACTURER_CREATE_RESET } from '../constants/clientConstants'



const ManufacturerScreen = ({ history }) => {
	const dispatch = useDispatch()
	const [q , setQ] = useState('')
	const [name, setName] = useState('')
	const [shortName, setShortName] = useState('')
	const [country, setCountry] = useState('')

	const manufacturerList = useSelector( state => state.manufacturerList )
	const { loading, error, manufacturers } = manufacturerList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const countryList = useSelector((state) => state.countryList)
	const { success:countrySuccess , countries } = countryList

	const manufacturerCreate = useSelector( state => state.manufacturerCreate )
	const { loading: createLoading, error: createError, success:createSuccess, manufacturer } = manufacturerCreate

	useEffect(() => {
		
		dispatch({type: MANUFACTURER_CREATE_RESET})

		if(!userInfo){
			history.push('/login')
		}

		dispatch(listManufacturers())
		dispatch(getCountry())

	},[dispatch,history,createSuccess])

	function search(manufacturers) {
		return manufacturers.filter((manufacturer) => 

										manufacturer.name.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
										manufacturer.shortName.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
										manufacturer.createdUser.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
										manufacturer.country.toLowerCase().indexOf(q.toLowerCase()) > -1
										 										
									)
	}

	const filteredManufacturers = search(manufacturers)

	const submitHandler = (e) =>{
		e.preventDefault()
		dispatch(createManufacturer({
			name,
			shortName,
			country
		}))

		}

	
	return(
		<>
		<h1>Add Manufacturers</h1>
		<Link to='/' className='btn btn-dark my-3'>Go Back</Link>
		{createLoading && <Loader />}
		{createError && <Message variant='danger'>{createError}</Message>}
		<Form onSubmit={submitHandler}>
		<Row className='my-3' >
			
			<Col>
				<Form.Group controlId='name'>
					<Form.Label>Manufacturer Name</Form.Label>
					<Form.Control type='text' placeholder='Manufacturer Name' 
								  value={name} onChange={e => setName(e.target.value)}
								/>
				</Form.Group>
			</Col>
			<Col>
				<Form.Group controlId='shortName'>
					<Form.Label>Short Name</Form.Label>
					<Form.Control type='text' placeholder='Short Name' 
								  value={shortName} onChange={e => setShortName(e.target.value)}
								/>
				</Form.Group>
			</Col>
			<Col>
				<Form.Group controlId='country'>
					<Form.Label>Country</Form.Label>
					<Form.Control as='select' value={country} 
						onChange={(e) => setCountry(e.target.value)}>
						<option value=''>Select Country</option>
						{countries.map(country => (
								<option value={country.name} >{country.name}</option>
							))   }
						</Form.Control>
				</Form.Group>
			</Col>
			
		</Row>
		<Button type='submit' variant='primary'>
				Save
			</Button>
		</Form>
		
			
		<h2 className='mt-4'>Manufacturer List</h2>
		<ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export"
              />

		{ loading ? <Loader />
			: error ? <Message variant='danger'>{error}</Message>
			: (		
				<div>
					<input type="search" placeholder="Search" className="me-2 my-2" aria-label="Search" 
						   value={q} onChange={(e) =>  setQ(e.target.value)}
					/>
					<Table striped bordered hover responsive='md' className='table-sm' id="table-to-xls">
						<thead>
							<tr>
								<th>Manufacturer Name</th>
								<th>Short Name</th>
								<th>Country</th>
								<th>CreatedBy</th>
								<th>Created Date</th>
							</tr>
						</thead>
						<tbody>
							{ filteredManufacturers.map(manufacturer => (
									<tr key={manufacturer._id} >
										<td>{manufacturer.name}</td>
										<td>{manufacturer.shortName}</td>
										<td>{manufacturer.country}</td>
										<td>{manufacturer.createdUser}</td>
										<td>{manufacturer.createdAt.substring(0,10)}</td>
									</tr>
								)) }
						</tbody>
					</Table>
				</div>
			 ) 
		 }
		
		</>
		)
}


export default ManufacturerScreen