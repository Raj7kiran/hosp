import React, {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table,  Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listLocations, deleteLocation } from '../actions/adminActions'
import { LOCATION_DELETE_RESET, LOCATION_CREATE_RESET } from '../constants/adminConstants'



const LocationScreen = ({ location, history }) => {
	const dispatch = useDispatch()

	const locationsList = useSelector(state => state.locationsList)
	const { loading, error, locations } = locationsList

	const locationCreate = useSelector(state => state.locationCreate)
	const {  success: successCreate } = locationCreate

	const locationDelete = useSelector(state => state.locationDelete)
	const { loading: loadingDelete, success: successDelete, error:errorDelete } = locationDelete

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin
	
	const redirect = location.search? location.search.split('=')[1] : '/'

	useEffect(() => {
		// dispatch({ type: LOCATION_CREATE_RESET })	
		 dispatch({ type: LOCATION_DELETE_RESET })	
		if(!userInfo || !userInfo.isAdmin){
			history.push('/login')
		}
		dispatch(listLocations())

	},[dispatch, successDelete ])

	const deleteHandler = (id) => {
		if(window.confirm('Are you sure you want to delete?')){
			dispatch(deleteLocation(id))
		}
	}

	return(
		<>
			<Link to='/' className='btn btn-dark'>Go Back</Link>
			<Row className='align-items-center'>
			
				<Col>
					<h1>Locations</h1>
				</Col>
				<Col className='text-right my-3'>
					<Link className='btn btn-dark' to='/admin/addlocation'>Add Location</Link>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{successDelete && <Message variant='success'>Location Deleted</Message>}
			{successCreate && <Message variant='success'>Location Added</Message>}
			{ loading ? (<Loader />)
			  : error ? (<Message variant='danger'>{error}</Message> )
			  : (
			  		<Table striped bordered hover responsive='md' className='table-sm'>
						<thead>
							<tr>
								<th>Country</th>
								<th>State</th>
								<th>City</th>
							</tr>
						</thead>
						<tbody>
							{locations.map(location => (
									<tr key={location._id} >
										<td>{location.country}</td>
										<td>{location.state}</td>
										<td>{location.city}</td>
										<td>
											<Button variant='danger' className='btn-sm' 
													onClick={()=> deleteHandler(location._id)}>
												<i className='fas fa-trash'></i>
											</Button>
										</td>
									</tr>
								))

							}
						</tbody>
					</Table>
			  	) }
			
		</>
		)
}

export default LocationScreen