import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Location from '../models/locationModel.js'



// const getClientList = asyncHandler(async(req,res) => {
// 	console.log(`req.use :  ${req.user}`)
// 	const clients = await User.find({ addedUserId: req.user._id })
// 	res.json(clients)
// })


const getLocations = asyncHandler(async(req,res) => {
		//res.send(req.headers)
	const locations = await Location.find({ user: req.user._id  })
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
	console.log(`product create ${createdLocation}`)
	res.status(201).json(createdLocation)
})

//delete product
const deleteLocation = asyncHandler(async(req,res)=> {
	const location = await Location.findById(req.params.id)

	if(location){
		await location.remove()
		res.json({ message: 'Location Deleted' })
	} else {
		res.status(404)
		throw new Error('Location not found')
	}
})


export { getLocations, createLocation, deleteLocation }