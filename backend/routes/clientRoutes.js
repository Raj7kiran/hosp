import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { getClientList, createClient } from '../controller/clientController.js'

router.route('/clientlist').get(protect, getClientList)
router.route('/').post(protect, createClient)


export default router