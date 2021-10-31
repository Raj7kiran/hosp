import asyncHandler from 'express-async-handler'
import generateToken from '../util/generateToken.js'
import User from '../models/userModel.js'


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



const getUserProfile = asyncHandler( async(req,res) => {
	console.log('success')

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


const getUserById = asyncHandler(async(req,res) => {
	console.log(`req.use :  ${req.params}`)
	const user = await User.findById(req.params.id).select('-password')
	
	if(user){
		res.json(user);
	} else {
		res.status(404)
		throw new Error('User not found')
	}
	
})


export { authUser, getUserProfile, getUserById }