import express from 'express'
const router = express.Router()
import {  getLocations, createLocation, deleteLocation } from '../controller/adminController.js'
import { protect, admin } from '../middleware/authMiddleware.js'


router.route('/createlocation').post(protect, createLocation)
// router.route('/clientlist').get(protect, getClientList)
router.route('/locations').get(protect, getLocations)
router.route('/locations/:id').delete(protect, deleteLocation)


export default router