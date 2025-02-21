import express from 'express' 
import {
    checkAuth,
    signUp,
    login,
    logout,
    updateProfile,
    getUserProfile,
    getAllUsers
} from "../controllers/authController.js"
import {authendicatedUser} from './../middlewares/auth.middleware.js'
const router = express.Router()


router.post('/signup',signUp)
router.post('/login',login)
router.delete('/logout',authendicatedUser,logout)

router.put('/update-profile',authendicatedUser, updateProfile)
router.get('/check',authendicatedUser, checkAuth)
router.get('/',authendicatedUser, getUserProfile)
router.get('/users',authendicatedUser, getAllUsers)

export default router