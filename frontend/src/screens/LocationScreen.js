import React from 'react'
import { Link } from 'react-router-dom'
import { Table,  Row, Col } from 'react-bootstrap'
import locations from '../location'


const LocationScreen = () => {

	return(
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Locations</h1>
				</Col>
				<Col className='text-right my-3'>
					<Link className='btn btn-dark' to='/admin/master'>Add Location</Link>
				</Col>
			</Row>
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
		</>
		)
}

export default LocationScreen