import express from 'express'
import { AddNewFacility,getAllFacilities, getSingleFacility} from '../controllers/facilitiesController.js'
import verifyRoles from '../middlewares/verifyRoles.js'
import ROLES_LIST from '../config/roles_list.js' 

const router = express.Router()

router.post('/',verifyRoles(ROLES_LIST.Admin),AddNewFacility)//admin only
router.get('/',getAllFacilities) //public
router.get('/:id',getSingleFacility)//public 

export default router