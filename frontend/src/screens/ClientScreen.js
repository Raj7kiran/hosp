import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listClients } from '../actions/clientActions'





const ClientScreen = () => {
	
	const clientList = useSelector(state => state.clientList)
	const { loading, success, users } = clientList

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(listClients())
	}, [dispatch])

	return (

		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Client List</h1>
				</Col>

				<Col className='text-right my-3'>
					<Link className='btn btn-dark' to='/addusers'>Add User</Link>
				</Col>
			</Row>
			<Table striped bordered hover responsive className='table-sm'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{	
						users.map((user) => (
						user.isAdmin ? ' ' : (
								<tr key={user.id}>
									<td>{user.name}</td>
									<td>{user.email}</td>
								</tr>
							)
							
						))}
					
				</tbody>
			</Table>
		</>

		)
}


export default ClientScreen