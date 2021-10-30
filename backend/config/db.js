import mongoose from 'mongoose'


const connectDB = async () => {
	try{
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology : true,
			useNewUrlParser: true,
			// useCreateIndex: true
		})

		console.log(`MongoDB Connected : ${conn.connection.host}`)
	} catch (err) {
		console.err(`Error: ${err.message}`);
		process.exit(1);//this is to exit with the error
	}
}

export default connectDB;