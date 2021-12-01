import mongoose from 'mongoose'
import dotenv from 'dotenv'
						   
import users from './data/users.js'
import locations from './data/location.js'
import countries from './data/countries.js'
import states from './data/states.js'
import cities from './data/cities.js'
import manufacturer from './data/manufacturer.js'
import supplier from './data/supplier.js'

import User from './models/userModel.js'
import Location from './models/locationModel.js'
import Country from './models/countryModel.js'
import State from './models/stateModel.js'
import City from './models/cityModel.js'
import Manufacturer from './models/manufacturerModel.js'
import Supplier from './models/supplierModel.js'
										  
import connectDB from './config/db.js'


																		  
dotenv.config()


connectDB()


const importData =  async () => {
	try{		  
							
		// await User.deleteMany()
		// await Location.deleteMany()
		// await Country.deleteMany()
		// await State.deleteMany()
		// await City.deleteMany()
		// await Manufacturer.deleteMany()
		await Supplier.deleteMany()

		// const createdUsers = await User.insertMany(users)
		// const adminUser = createdUsers[0]._id
		// const sampleLocations = locations.map(location => {
		// 	return { ...location, user:adminUser }
		// })

		// await Location.insertMany(sampleLocations)

		// await Country.insertMany(countries)

		// await State.insertMany(states)

		// await City.insertMany(cities)

		//await Manufacturer.insertMany(manufacturer)

		await Supplier.insertMany(supplier)


		console.log('Data Imported')
		process.exit()

	} catch(err){
		console.error(`${err}`)
		process.exit(1)
	}
}


const destroyData = async() => {
	try{				  
							
		await User.deleteMany()
		await Location.deleteMany()
		await Country.deleteMany()
		await State.deleteMany()
		await City.deleteMany()
		await Manufacturer.deleteMany()
		await Supplier.deleteMany()

		console.log('Data deleted')
		process.exit() 
	} catch(err){
		console.error(`${err}`)
		process.exit(1)
	}
}

if(process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}