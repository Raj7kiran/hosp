import express from 'express'
const router = express.Router()
import { getClientList, getLocations, createLocation } from '../controller/adminController.js'


router.route('/createlocation').post(createLocation)
router.route('/clientlist').get(getClientList)
router.route('/master').get(getLocations)


export default router