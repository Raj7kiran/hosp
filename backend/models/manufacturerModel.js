import mongoose from 'mongoose'


const manSchema = mongoose.Schema({	
		name: { type: String, required: true, unique: true },
		shortName: { type: String, required: true },
		country: { type: String, required: true },
		createdUser: { type: String, required: true },
		user : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},	
	{
		timestamps: true
	}
)


const Manufacturer = new mongoose.model('Manufacturer', manSchema)

export default Manufacturer
