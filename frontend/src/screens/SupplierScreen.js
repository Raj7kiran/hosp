import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { Table, Row, Col, Button, Form, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listSupplier, createSupplier, deleteSupplier} from '../actions/clientActions'
import { SUPPLIER_CREATE_RESET } from '../constants/clientConstants'


const SupplierScreen = ({history}) => {
	const dispatch = useDispatch()
	const [q, setQ] = useState('')
	const [supplierName, setSupplierName] = useState('')
	const [supplierContact, setSupplierContact] = useState('')
	const [position, setPosition] = useState('')
	const [email, setEmail] = useState('')
	const [contactNumber, setContactNumber] = useState('')
	const [altContactNumber, setAltContactNumber] = useState('')
	const [credit, setCredit] = useState('')
	const [category, setCategory] = useState('')
	const [address, setAddress] = useState('')
	const [houseno,setHouseno] = useState('')
	const [street,setStreet] = useState('')
	const [area,setArea] = useState('')

	const supplierList = useSelector(state => state.supplierList)
	const { loading, error, suppliers } = supplierList

	const userLogin = useSelector(state => state.userLogin)
	const {userInfo} = userLogin

	const supplierCreate = useSelector(state => state.supplierCreate)
	const { loading: createLoading, error: createError, success: createSuccess, supplier  } = supplierCreate

	const supplierDelete = useSelector(state => state.supplierDelete)
	const { loading: loadingDelete, success: successDelete, error:errorDelete } = supplierDelete


	useEffect(() => {

		if(!userInfo){
			history.push('/login')
		}

		// if(createSuccess){
		// 	dispatch({type: SUPPLIER_CREATE_RESET })
		// }

		dispatch(listSupplier())

	},[dispatch, history, createSuccess, successDelete])

	function search(suppliers) {
		return suppliers.filter((supplier) => 
										supplier.supplierName.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
										supplier.supplierContact.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
										supplier.email.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
										supplier.position.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
										supplier.address.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
										supplier.contactNumber.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
										supplier.credit.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
										supplier.createdUser.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
										supplier.contactNumber.toLowerCase().indexOf(q.toLowerCase()) > -1										 										
									)}

	const filteredSuppliers = search(suppliers)

	const submitHandler = (e) => {
		
		// setAddress(`${houseno}, ${street}, ${area}`)
		// console.log(`adress: ${address}`)

		e.preventDefault()
		dispatch(createSupplier({
			supplierName,
			supplierContact,
			position,
			email,
			contactNumber,
			altContactNumber,
			credit,
			category,
			houseno,
			street,
			area
		}))
	} 

	const deleteHandler = (id) => {
		if(window.confirm('Are you sure you want to delete?')){
			dispatch(deleteSupplier(id))
		}
	}
	

	return(
		<>
		<h3>Add Suppliers</h3>
		<Link to='/' className='btn-sm btn-dark my-3'>Go Back</Link>
		<br />
		<div className='my-3' border="info">
		{createLoading && <Loader />}
		{createError && <Message variant='danger'>{createError}</Message>}
		{loadingDelete && <Loader />}
		{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
		{createSuccess && <Message variant='success'>Supplier added successfully!</Message>}
		<Form onSubmit={submitHandler}>
			<Row >			
				<Col>
					<Form.Group controlId='supplierName' size='sm'>
						<Form.Label>Company Name</Form.Label>
						<Form.Control type='text' placeholder='Company Name' 
									  value={supplierName} onChange={e => setSupplierName(e.target.value)}
									/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='supplierContact'>
						<Form.Label>Contact Person</Form.Label>
						<Form.Control type='text' placeholder='Contact Person' 
									  value={supplierContact} onChange={e => setSupplierContact(e.target.value)}
									/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='designation'>
							<Form.Label>Position</Form.Label>
							<Form.Control as='select' value={position} 
								onChange={(e) => setPosition(e.target.value)}>
								<option value=''>Select Position</option>
								<option value='Position 1'>Position 1</option>
								<option value='Position 2'>Position 2</option>
								<option value='Position 3'>Position 3</option>
							</Form.Control>
					</Form.Group>
				</Col>
			</Row>
			<Row>			
				<Col>
					<Form.Group controlId='email'>
						<Form.Label>Email</Form.Label>
						<Form.Control type='text' placeholder='email' 
									  value={email} onChange={e => setEmail(e.target.value)}
									/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='supplierContact'>
						<Form.Label>Contact Number</Form.Label>
						<Form.Control type='text' placeholder='Contact Number' 
									  value={contactNumber} onChange={e => setContactNumber(e.target.value)}
									/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='supplierContact'>
						<Form.Label>Alt. Contact Number</Form.Label>
						<Form.Control type='text' placeholder='Alt. Contact Number' 
									  value={altContactNumber} onChange={e => setAltContactNumber(e.target.value)}
									/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Group controlId='credit'>
							<Form.Label>Credit</Form.Label>
							<Form.Control as='select' value={credit} 
								onChange={(e) => setCredit(e.target.value)}>
								<option value=''>Credit</option>
								<option value='30 days'>30 days</option>
								<option value='60 days'>60 days</option>
							</Form.Control>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Control as='select' value={category} 
								onChange={(e) => setCategory(e.target.value)}>
								<option value=''>Category</option>
								<option value='Category 1'>Category 1</option>
								<option value='Category 2'>Category 2</option>
								<option value='Category 3'>Category 3</option>
							</Form.Control>
					</Form.Group>
				</Col>
			</Row>
			<Row>	
					{/*<Form.Group controlId='address'>*/}
						<Form.Label>Address</Form.Label>
						{/*<div className='address' >
							<Form.Control type='text' placeholder='House #' className='mx-2'
									  value={houseno} onChange={e => setHouseno(e.target.value)}
									/>
							<Form.Control type='text' placeholder='Street' className='mx-2'
									  value={street} onChange={e => setStreet(e.target.value)}
									/>
							<Form.Control type='text' placeholder='Area' className='mx-2'
									  value={area} onChange={e => setArea(e.target.value)}
									/>
						</div>
					</Form.Group>*/}

					
				<Col>						
						<Form.Group controlId='houseno'>
						<Form.Label>  </Form.Label>
							<Form.Control type='text' placeholder='House #' className='mt-1'
									  value={houseno} onChange={e => setHouseno(e.target.value)}
									/>
						</Form.Group>
				</Col>
				<Col>
						<Form.Group controlId='street'>
						<Form.Label>  </Form.Label>
							<Form.Control type='text' placeholder='Street' className='mt-1'
									  value={street} onChange={e => setStreet(e.target.value)}
									/>
						</Form.Group>
				</Col>
				<Col>
						<Form.Group controlId='area'>
						<Form.Label>  </Form.Label>
							<Form.Control type='text' placeholder='Area' className='mt-1'
									  value={area} onChange={e => setArea(e.target.value)}
									/>
						</Form.Group>
				</Col>				
			</Row>
			<Button type='submit' variant='primary' className='mt-3 btn-sm'>
				Save
			</Button>

		</Form>
		</div>


		<Row className='mt-5'>
		<Col>
			<h3>Supplier List</h3>
		</Col>
		<Col>
			<ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export"
              />
		</Col>
			</Row>

		{ loading ? <Loader />
		  : error ? <Message variant='danger'>{error}</Message>
		  : (	
		  		<div>
		  		<input type="search" placeholder="Search" className="me-2 my-2" aria-label="Search" 
						   value={q} onChange={(e) =>  setQ(e.target.value)}
					/>
		  		<Table striped bordered hover responsive className='table-sm' id="table-to-xls" >
						<thead>
							<tr>
								<th>Supplier Name</th>
								<th>Contact Person</th>
								<th>ID</th>
								<th>Address</th>
								<th>Email</th>
								<th>Contact No</th>
								<th>Position</th>
								<th>Credit</th>
								<th>Category</th>
								<th>Created By</th>
								<th>Created Date</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{ filteredSuppliers.map(supplier => (
									<tr key={supplier._id} >
										<td>{supplier.supplierName}</td>
										<td>{supplier.supplierContact}</td>
										<td>{supplier._id}</td>
										<td>{supplier.address}</td>
										<td>{supplier.email}</td>
										<td>{supplier.contactNumber}</td>
										<td>{supplier.position}</td>
										<td>{supplier.credit}</td>
										<td>{supplier.category}</td>
										<td>{supplier.createdUser}</td>
										<td>{supplier.createdAt.substring(0,10)}</td>
										<td>
											{/*<LinkContainer to={`/admin/product/${product._id}/edit`}>
												<Button variant='light' className='btn-sm'>
													<i className='fas fa-edit'></i>
												</Button>
											</LinkContainer>*/}
											<Button variant='danger' className='btn-sm' 
													onClick={()=> deleteHandler(supplier._id)}>
												<i className='fas fa-trash'></i>
											</Button>
										</td>
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


export default SupplierScreen