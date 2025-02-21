import express from 'express'
import { AddNewEngineer,getAllEngineers, getSingleEngineer, updateEngineer} from '../controllers/engineerController.js'
import verifyRoles from '../middlewares/verifyRoles.js'
import ROLES_LIST from '../config/roles_list.js' 

const router = express.Router()

router.post('/',verifyRoles(ROLES_LIST.Admin),AddNewEngineer)//admin only
router.get('/',getAllEngineers)//public
router.get('/:id',getSingleEngineer)//public
router.put('/:id',verifyRoles(ROLES_LIST.Admin),updateEngineer) //admin only

export default router