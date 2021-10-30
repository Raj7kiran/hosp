import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, getUserById } from '../controller/userController.js'


router.post('/login', authUser)

router.route('/profile').get(getUserProfile)

router.route('/:id').get(getUserById)



export default router

