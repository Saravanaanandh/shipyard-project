import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})

export default cloudinary

// export const updateProfile = async (req, res)=>{
//     const {profilePic} = req.body
//     const userId = req.user._id
//     if(!profilePic) return res.status(400).json({message:'profile picture is required'})
//     const updateResponse = await cloudinary.uploader.upload(profilePic)
//     const updatedUser = await User.findByIdAndUpdate(userId ,{profilePic:updateResponse.secure_url},{new:true})
//     res.status(200).json(updatedUser)
// }