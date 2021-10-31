import React, {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table,  Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listLocations } from '../actions/adminActions'



const LocationScreen = ({ location }) => {
	const dispatch = useDispatch()

	const locationDetails = useSelector(state => state.locationDetails)
	const { loading, error, locations } = locationDetails
	
	const redirect = location.search? location.search.split('=')[1] : '/'

	useEffect(() => {
		dispatch(listLocations())
	},[dispatch])

	// const locations = []

	return(
		<>
			<Link to={redirect} className='btn btn-dark'>Go Back</Link>
			<Row className='align-items-center'>
			
				<Col>
					<h1>Locations</h1>
				</Col>
				<Col className='text-right my-3'>
					<Link className='btn btn-dark' to='/admin/addlocation'>Add Location</Link>
				</Col>
			</Row>
			{ loading ? (<Loader />)
			  : error ? (<Message variant='danger'>{error}</Message> )
			  : (
			  		<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>Country</th>
								<th>State</th>
								<th>City</th>
							</tr>
						</thead>
						<tbody>
							{locations.map(location => (
									<tr>
										<td>{location.country}</td>
										<td>{location.state}</td>
										<td>{location.city}</td>
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