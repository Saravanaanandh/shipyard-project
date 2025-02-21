import express from 'express'
import { createNewShippingOrder,getAllOrders, getSingleOrder, updateOrder} from '../controllers/buildingController.js'
import verifyRoles from '../middlewares/verifyRoles.js'
import ROLES_LIST from '../config/roles_list.js' 

const router = express.Router()

router.post('/',verifyRoles(ROLES_LIST.Client),createNewShippingOrder)//client
router.get('/',verifyRoles(ROLES_LIST.Admin),getAllOrders) //admin only
router.get('/:id',getSingleOrder)//authendicated user
router.put('/:id',verifyRoles(ROLES_LIST.Admin),updateOrder) //admin only

export default router