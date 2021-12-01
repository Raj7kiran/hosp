import express from 'express'
const router = express.Router()
import { protect } from '../middleware/authMiddleware.js'
import { getClientList, createClient, getManufacturer, addManufacturer, deleteManufacturer, 
		 getSupplier, addSupplier, deleteSupplier
		} from '../controller/clientController.js'

router.route('/clientlist').get(protect, getClientList)
router.route('/').post(protect, createClient)
router.route('/manufacturer').get(protect, getManufacturer).post(protect, addManufacturer)
router.route('/manufacturer/:id').delete(protect, deleteManufacturer)
router.route('/supplier').get(protect, getSupplier).post(protect, addSupplier)
router.route('/supplier/:id').delete(protect, deleteSupplier)


export default router