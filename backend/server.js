import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import Location from './models/locationModel.js'

import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'


const app = express();

app.use(express.json())


dotenv.config()
connectDB()


app.use('/users', userRoutes)
app.use('/admin', adminRoutes)


const __dirname = path.resolve()
//app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


if(process.env.NODE_ENV === 'production'){
	app.use(express.static(path.join(__dirname, '/frontend/build')))

	app.get('*', (req,res) => 
		res.sendFile(path.resolve(__dirname, 'frontend','build', 'index.html')))
} else {
	app.get('/', (req,res) => {
		res.send('API running....');
	})
}

//const PORT = process.env.PORT || 5000

// app.get('/', (req,res) => {
// 	res.send('API is running')
// })

// app.get('/locations', async (req,res) => {
// 	const locations = await Location.find({})

// 	res.send(locations)
// })


app.listen(5000, console.log(`Backend server is running in 5000`));