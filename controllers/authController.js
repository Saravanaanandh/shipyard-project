
import cloudinary from './../config/cloudinary.js'
import User from '../model/User.js'

export const signUp = async(req, res)=>{ 
    const {username, email, password,mobile,roles} = req.body
    if(!username || !email || !password || !mobile || !roles) return res.status(400).json({message:'please provide username, email and password'})

    const duplicateUser = await User.findOne({email})
    if(duplicateUser) return res.status(409).json({message:'User with that email is already exists!'})
    
    const user = await User.create({...req.body})
    const token = user.createJWT()
    user.token = token
    res.cookie("jwt",token,{httpOnly:true,maxAge:30*24*60*60*1000,secure:true,sameSite: "Strict"})
    res.status(201).json(user)
}

export const login = async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password) return res.status(400).json({message:'please provide email and password'})

    const user = await User.findOne({email})
    if(!user) return res.status(404).json({message:'User cannot find with that email!'})
        
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect) return res.status(401).json({message:'Invalid crendentials'})
    const token = user.createJWT()
    user.token = token
    res.cookie("jwt",token,{httpOnly:true,maxAge:30*24*60*60*1000,secure:true,sameSite: "Strict"})
    res.status(200).json(user)
}

export const logout = async(req, res)=>{
    const {email} = req.user
    const user = await User.findOne({email})
    user.token = ""
    res.clearCookie('jwt',"",{secure:true,httpOnly:true,maxAge:0,sameSite: "Strict"})
    res.status(204).json(user)
}

export const updateProfile = async (req, res)=>{
    const {profile} = req.body
    const userId = req.user._id
    if(!profile) return res.status(400).json({message:'profile picture is required'})
    const updateResponse = await cloudinary.uploader.upload(profile)
    const updatedUser = await User.findByIdAndUpdate(userId ,{profile:updateResponse.secure_url},{new:true})
    res.status(200).json(updatedUser)
}

export const checkAuth = async (req, res)=>{
    if(!req.user) return res.status(401).json({message:'unauthorized user'})
    res.status(200).json(req.user)
}


export const getUserProfile = async(req, res)=>{
    const {_id:userId} = req.user;

    if(!userId) return res.status(401).json({message:"unauthorized user"})

    const user = await User.findOne({_id:userId})
    if(!user) return res.status(403).json({message:"forbidden"})

    res.status(200).json(user)
}
export const getAllUsers = async(req, res)=>{
    const {_id:userId} = req.user;

    if(!userId) return res.status(401).json({message:"unauthorized user"})

    const users = await User.findOne({_id:{$ne:userId}})
    if(!users) return res.status(403).json({message:"forbidden"})

    res.status(200).json(users)
}
