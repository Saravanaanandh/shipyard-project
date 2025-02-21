import express from 'express'
import { UploadFinancial, getAllFinancials, getSingleFinancial, updateFinancial} from '../controllers/financialController.js'
import verifyRoles from '../middlewares/verifyRoles.js'
import ROLES_LIST from '../config/roles_list.js' 

const router = express.Router()

router.post('/',verifyRoles(ROLES_LIST.Admin),UploadFinancial)//admin only
router.get('/',getAllFinancials)//public
router.get('/:id',getSingleFinancial)//public
router.put('/:id',verifyRoles(ROLES_LIST.Admin),updateFinancial)//admin only

export default router