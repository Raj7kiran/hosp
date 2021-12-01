import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import Manufacturer from '../models/manufacturerModel.js'
import Supplier from '../models/supplierModel.js'



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
		createdUser: req.user.name,
		user:req.user._id
	})
	    console.log(manufacturer.createdUser)
		console.log(typeof(manufacturer.createdUser))
	const createdManufacturer = await manufacturer.save()
	res.status(200).json(createdManufacturer)
})


//delete Manfacturer
const deleteManufacturer = asyncHandler(async(req,res) => {
	const manufacturer = await Manufacturer.findById(req.params.id)

	if(manufacturer){
		await manufacturer.remove()
		res.json({ message: 'Manufacturer Deleted' })
	} else {
		res.status(404)
		throw new Error('Manufacturer not found')
	}
})


//get manufacturer
const getSupplier = asyncHandler(async(req,res) => {
	const suppliers = await Supplier.find({})
	res.json(suppliers)
})


//add Manufacturer
const addSupplier = asyncHandler(async(req,res) => {
	const { supplierName, supplierContact, position, email, contactNumber, altContactNumber, credit, category, 
			houseno, street, area
	 } = req.body

	 const address = `${houseno}, ${street}, ${area}`
	 console.log(address)
	const supplier = new Supplier({
		supplierName, 
		supplierContact, 
		position, 
		email, 
		contactNumber, 
		altContactNumber, 
		credit, 
		category, 
		address,
		createdUser: req.user.name,
		user:req.user._id
	})
	    // console.log(supplier.createdUser)
		console.log(typeof(supplier.createdUser))
		const createdSupplier = await supplier.save()
		res.status(200).json(createdSupplier)
})

//delete Supplier
const deleteSupplier = asyncHandler(async(req,res) => {
	const supplier = await Supplier.findById(req.params.id)

	if(supplier){
		await supplier.remove()
		res.json({ message: 'Supplier Deleted' })
	} else {
		res.status(404)
		throw new Error('Supplier not found')
	}
})


export { getClientList, createClient, getManufacturer, addManufacturer, getSupplier, addSupplier, deleteSupplier, deleteManufacturer  }