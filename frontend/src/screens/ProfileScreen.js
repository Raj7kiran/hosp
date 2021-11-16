import axios from 'axios'
import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Form,Button, Row, Col, Image } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Dropdown from '../components/Dropdown'
import Dropdown2 from '../components/Dropdown2'
import profilepic from '../images/profile.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { getCountry, getAState, getCity } from '../actions/dropActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'




const ProfileScreen = ({ location, history }) => {
	
	const [ image, setImage ] = useState(profilepic)
	const [ name, setName ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ confirmPassword, setConfirmPassword ] = useState('')
	const [ gender, setGender ] = useState('')
	const [ address, setAddress ] = useState('')
	const [ phone, setPhone ] = useState('')
	const [ pincode, setPincode ] = useState('')
	const [ designation, setDesignation] = useState('')
	const [ uploading, setUploading] = useState(false)
	const [ selectedDate, setSelectedDate ] = useState(null)
	const [ dob, setDob ] = useState(null)

	//these are for the dropdown
	// const [ value, setValue ] = useState(null)
	const [ country, setCountry ] = useState('')
	const [ astate, setAstate ] = useState('')
	const [ city, setCity ] = useState('')
	

	const [ message, setMessage ] = useState(null)

	

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails	

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const countryList = useSelector((state) => state.countryList)
	const { success:countrySuccess , countries } = countryList

	const stateList = useSelector((state) => state.stateList)
	const { success:stateSuccess , states } = stateList

	const cityList = useSelector((state) => state.cityList)
	const { success:citySuccess , cities } = cityList

	const userUpdateProfile = useSelector(state => state.userUpdateProfile )
	const { success } = userUpdateProfile

	
	useEffect(() => {
		
		// console.log(`country : ${country}, name: ${country.name}, id=${country.countryId}`)		
		dispatch(getCountry())
		console.log(country)
		console.log(astate)
		

		if(!userInfo){
			history.push('/')
		} else {				
						
			if(!user || !user.name || success){
				dispatch({ type: USER_UPDATE_PROFILE_RESET })
				dispatch(getUserDetails('profile'))
			} else {
				setName(user.name)
				setEmail(user.email)
				setCountry(user.country)
				setCity(user.city)
				setAstate(user.state)
				setImage(user.image)
				setDesignation(user.designation)
				setGender(user.gender)
				setAddress(user.address)
				setPincode(user.pincode)
				setPhone(user.phone)
				setDob(user.date)

				
				dispatch(getAState(user.country))
				dispatch(getCity(user.state))
				
					
			}
		}

	},[dispatch, history, userInfo, user, success])

	const submitHandler = (e) => {

		e.preventDefault()
		if(password !== confirmPassword){
			setMessage('Passwords does not match')
		} else {
			dispatch(updateUserProfile({ 
				id: user._id, name, email, password, image, designation, gender, date: dob,
				country, state: astate, city, address, pincode, phone 
			}))
		}
		
	}

	const uploadFileHandler = async(e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		setUploading(true)

		try{
			const config = {
				headers : {
					'Content-Type': 'multipart/form-data'
				}
			}

			const { data } = await axios.post('/upload', formData, config)
			setImage(data)
			setUploading(false)

		} catch(error) {
			console.log(error)
			setUploading(false)
		}

	}

	const callStates = (value) => {		
		console.log(value)
		dispatch(getAState(value))
	}

	const callCity = (value) => {		
		console.log(value)
		dispatch(getCity(value))
	}

	const convertDate = (d) => {
		console.log(typeof(d))
		console.log(d)
		const data = d.toString().slice(0,15)
		setDob(data)
	}

	const forcity = (c) => {
		console.log(`c.name: ${c.name}`)
		// c.name===undefined ? console.log(`c: ${c}`) : console.log(`c.name : ${c.name}`)
		c.name===undefined ? setCity(c) : setCity(c.name)


		console.log(`City: ${city}`)
	}
	

	return (
		<>
			<h1>Profile</h1>
			{/*<Row className='align-items-center'>
				<Col>
					<h1>Profile</h1>
				</Col>
				<Col className='text-right my-3'>
					<Link className='btn btn-primary' to='/updateprofile'>Update Profile</Link>
				</Col>
			</Row>*/}
			<Row>
				<Col md={6}>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{success && <Message variant='success'>Profile Updated</Message>}
				{ loading ? (<Loader />)
				  : error ? (<Message variant='danger'>{error}</Message>)
				  : (
				  		<Form onSubmit={submitHandler} >
				  			<Image className='profilepic' src={image} alt='Profile Image' fluid />
				  			
					  		<Form.Group controlId='image'>
								<Form.Label>Image</Form.Label>
									{/*<Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}>
									</Form.File>*/}
									<Form.Control  label='Choose File' custom onChange={uploadFileHandler} type="file" />
									{uploading && <Loader />}
							</Form.Group>							

							<Form.Group controlId='name'>
								<Form.Label>Name</Form.Label>
									<Form.Control type= 'name'
													placeholder='Enter name'
													value={name}
													onChange = {(e)=> setName(e.target.value)}
									>
									</Form.Control>
							</Form.Group>

							<Form.Group controlId='email'>
								<Form.Label>Email Address</Form.Label>
									<Form.Control type= 'email'
													placeholder='Enter mail'
													value={email}
													onChange = {(e)=> setEmail(e.target.value)}
									>
									</Form.Control>
							</Form.Group>

							<Form.Group controlId='designation'>
										<Form.Label>Designation</Form.Label>
										<Form.Control as='select' value={designation} 
											onChange={(e) => setDesignation(e.target.value)}>
											<option value=''>Select Designation</option>
											<option value='Role 1'>Role 1</option>
											<option value='Role 2'>Role 2</option>
											<option value='Role 3'>Role 3</option>
										</Form.Control>
							</Form.Group>

							<Form.Group controlId='gender'>
										<Form.Label>Gender</Form.Label>
										<Form.Control as='select' value={gender} 
											onChange={(e) => setGender(e.target.value)}>
											<option value=''>Select Gender</option>
											<option value='Male'>Male</option>
											<option value='Female'>Female</option>
											<option value='Others'>Others</option>
										</Form.Control>
							</Form.Group>

							<Form.Group controlId='date'>
								<Form.Label>Date of Birth:  <strong>{dob}</strong></Form.Label>
								<DatePicker 
									selected={selectedDate} 
									onChange={ date =>{ setSelectedDate(date)
									 					convertDate(date)}}
									dateFormat='yyyy-MM-dd'
									// maxDate={new Date()}
									showYearDropdown
									scrollableMonthYearDropdown
								/>
							</Form.Group>
							

							<Form.Group controlId='country'>
										<Form.Label>Country</Form.Label>
										<Form.Control as='select' value={country} 
											onChange={(e) => {
												setCountry(e.target.value)
												callStates(e.target.value)
											}}>
											<option value=''>Select Country</option>
											{countries.map(country => (
													<option value={country.name} >{country.name}</option>
												))   }
											</Form.Control>
							</Form.Group>

							<Form.Group controlId='state'>
										<Form.Label>State</Form.Label>
										<Form.Control as='select' value={astate} 
											onChange={(e) => {
												setAstate(e.target.value)
												callCity(e.target.value)
											}}>
											<option value=''>Select State</option>
											{states.map(st => (
												<option value={st.name}>{st.name}</option>
											))  }
										</Form.Control>
							</Form.Group>

							
							<div className='my-3' style={{width: 200}}>
								<Form.Label>City : {city}</Form.Label>
								<Dropdown 	options={cities} prompt='Select City'
											id= '_id' label='name'
											value={city} onChange={val => forcity(val)}
								 />
							</div>

							<Form.Group controlId='address'>
										<Form.Label>Address</Form.Label>
										<Form.Control as='textarea' row='3' value={address} 
											onChange={(e) => setAddress(e.target.value)}>
										</Form.Control>
							</Form.Group>

							<Form.Group controlId='pincode'>
								<Form.Label>Pincode</Form.Label>
									<Form.Control type= 'text'
													placeholder='Enter pincode'
													value={pincode}
													onChange = {(e)=> setPincode(e.target.value)}
									>
									</Form.Control>
							</Form.Group>

							<Form.Group controlId='phone'>
								<Form.Label>Phone</Form.Label>
									<Form.Control type= 'text'
													placeholder='Enter phone number'
													value={phone}
													onChange = {(e)=> setPhone(e.target.value)}
									>
									</Form.Control>
							</Form.Group>
							

							<Form.Group controlId='password'>
								<Form.Label>Password</Form.Label>
									<Form.Control type= 'password'
													placeholder='Enter password'
													value={password}
													onChange = {(e)=> setPassword(e.target.value)}
									>
									</Form.Control>
							</Form.Group>

							<Form.Group controlId='confirmPassword'>
								<Form.Label>Confirm Password</Form.Label>
									<Form.Control type= 'password'
													placeholder='Confirm password'
													value={confirmPassword}
													onChange = {(e)=> setConfirmPassword(e.target.value)}
									>
									</Form.Control>
							</Form.Group>

							<Button type='submit' variant='primary'>
								Update
							</Button>
						</Form>
				  	)}
					
				</Col>
			</Row>
					
         </>
		)
}

export default ProfileScreen