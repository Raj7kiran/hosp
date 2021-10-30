import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'



const getClientList = asyncHandler(async(req,res) => {
	const clients = await User.find({ user: req.user._id })
	res.json(clients)
})


export { getClientList }