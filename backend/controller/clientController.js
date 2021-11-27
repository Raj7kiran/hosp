import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Manufacturer from '../models/manufacturerModel.js'



//get the users list
const getClientList = asyncHandler(async(req,res) => {
	console.log(`req.user :  ${req.user}`)
	const clients = await User.find({ addedUserId: req.user._id })
	res.json(clients)
})


//add user
const createClient = asyncHandler(async(req,res) => {
	const { name, email, isAdmin, isClientAdmin } = req.body

	const user = new User({
		name,
		email,
		password: '12345',
		isAdmin,
		isClientAdmin,
		addedUserId: req.user._id
	})

	const createdUser = await user.save()
	res.status(201).json(createdUser)

})

//get manufacturer
const getManufacturer = asyncHandler(async(req,res) => {
	const manufacturer = await Manufacturer.find({})
	res.json(manufacturer)
})


//add Manufacturer
const addManufacturer = asyncHandler(async(req,res) => {
	const { name, shortName, country } = req.body

	const manufacturer = new Manufacturer({
		name,
		shortName,
		country,
		user:req.user._id
	})

	const createdManufacturer = await manufacturer.save()
	res.status(200).json(createdManufacturer)
})

export { getClientList, createClient, getManufacturer, addManufacturer }