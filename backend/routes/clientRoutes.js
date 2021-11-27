import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { getClientList, createClient, getManufacturer, addManufacturer } from '../controller/clientController.js'

router.route('/clientlist').get(protect, getClientList)
router.route('/').post(protect, createClient)
router.route('/manufacturer').get(protect, getManufacturer).post(protect, addManufacturer)



export default router