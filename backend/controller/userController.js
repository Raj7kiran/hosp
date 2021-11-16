import asyncHandler from 'express-async-handler'
import generateToken from '../util/generateToken.js'
import User from '../models/userModel.js'


//login authentication
const authUser = asyncHandler( async(req,res) => {
	const {email , password} = req.body

	const user = await User.findOne({ email })

	if(user && (await user.matchPassword(password))){
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id)
		})
	} else {
		res.status(401)
		throw new Error('Invalid username or password')
	}


	res.send({email, password})
} )


//get user profile
const getUserProfile = asyncHandler( async(req,res) => {
	

	const user = await User.findById(req.user._id);

	if(user) {
		console.log(user)
		res.json(user)
	} else {
		res.status(404)
		throw new Error('User not found')
	}

})


//update user profile
const updateUserProfile = asyncHandler(async(req,res) => {
	const user = await User.findById(req.user._id)

	if(user){
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.image = req.body.image || user.image
		user.date = req.body.date || user.date
		user.designation = req.body.designation || user.designation 
		user.gender = req.body.gender || user.gender
		user.country = req.body.country || user.country 
		user.state = req.body.state || user.state 
		user.city = req.body.city || user.city 
		user.address = req.body.address || user.address 
		user.pincode = req.body.pincode || user.pincode 
		user.phone = req.body.phone || user.phone 
		

		if(req.body.password){gender
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			date: updatedUser.date,
			image: updatedUser.image,
			isAdmin: updatedUser.isAdmin,
			isClientAdmin: updatedUser.isClientAdmin,
			country: updatedUser.country,
			state: updatedUser.state,
			city: updatedUser.city,
			designation: updatedUser.designation,
			gender: updatedUser.gender,
			address: updatedUser.address,
			pincode: updatedUser.pincode,
			phone: updatedUser.phone,
			token: generateToken(updatedUser._id)
		})
	} else {
		res.status(404)
		throw new Error ('User not found')
	}

})



//get user by ID ---it is a spare
const getUserById = asyncHandler(async(req,res) => {
	
	const user = await User.findById(req.params.id).select('-password')
	
	if(user){
		res.json(user);
	} else {
		res.status(404)
		throw new Error('User not found')
	}
	
})


export { authUser, getUserProfile, getUserById, updateUserProfile }