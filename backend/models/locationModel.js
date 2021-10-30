import mongoose from 'mongoose'


const locationSchema = mongoose.Schema(
	{
		country : {
			type: String,
			required: true
		},
		state : {
			type: String,
			required: true
		},
		city : {
			type: String,
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
)



const Location = mongoose.model( 'Location',  locationSchema);

export default Location