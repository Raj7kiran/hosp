import express from 'express'
const router = express.Router()
import { getClientList } from '../controller/adminController.js'


router.route('/clientlist').get(getClientList)


export default router