import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, getUserById } from '../controller/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'



router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile)

router.route('/:id').get(protect, getUserById)



export default router

