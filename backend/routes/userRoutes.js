import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, getUserById, updateUserProfile } from '../controller/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'



router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile )

router.route('/:id').get(protect, getUserById)



export default router

