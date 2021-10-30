import mongoose from 'mongoose'
import dotenv from 'dotenv'
						   
import users from './data/users.js'
import locations from './data/location.js'
import User from './models/userModel.js'
import Location from './models/locationModel.js'
										  
import connectDB from './config/db.js'


																		  
dotenv.config()


connectDB()


const importData =  async () => {
	try{		  
							
		await User.deleteMany()
		await Location.deleteMany()

		const createdUsers = await User.insertMany(users)
		const adminUser = createdUsers[0]._id
		const sampleLocations = locations.map(location => {
			return { ...location, user:adminUser }
		})

		await Location.insertMany(sampleLocations)

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