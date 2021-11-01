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
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			isClientAdmin: user.isClientAdmin
		})
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

		if(req.body.password){
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			isClientAdmin: updatedUser.isClientAdmin,
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