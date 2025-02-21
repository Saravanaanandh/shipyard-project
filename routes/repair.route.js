import express from 'express'
import { submitRepairComplaint,getAllRepairs, getSingleRepair, updateRepair } from '../controllers/repairController.js'
import verifyRoles from '../middlewares/verifyRoles.js'
import ROLES_LIST from '../config/roles_list.js' 

const router = express.Router()

router.post('/',verifyRoles(ROLES_LIST.Client),submitRepairComplaint)//clients
router.get('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Engineer),getAllRepairs)//admin, engineers
router.get('/:id',getSingleRepair)//authendicated user
router.put('/:id',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Engineer),updateRepair) //admin, engineer

export default router