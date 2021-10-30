import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Location from '../models/locationModel.js'




const getClientList = asyncHandler(async(req,res) => {
	console.log(`req.use :  ${req.user}`)
	const clients = await User.find({ user: req.user._id })
	res.json(clients)
})


const getLocations = asyncHandler(async(req,res) => {
	const locations = await Location.find({})
	res.json(locations)
})


const createLocation = asyncHandler(async(req,res) => {
	const { country, state, city } = req.body

	const location = new Location({
		country,
		state,
		city,
		user:req.user._id
	})

	const createdLocation = await location.save()
	res.status(201).json(createdProduct)
})


export { getClientList, getLocations, createLocation }