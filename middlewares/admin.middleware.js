
import jwt from 'jsonwebtoken'
import User from  '../model/User.js'

export const authendicatedAdmin = async (req, res, next)=>{
    const cookies = req.cookies
    if(!cookies?.jwt)   return res.status(401).json({message:'Unauthorized user'})
    
    const token = cookies.jwt
    const decode = jwt.verify(
        token,
        process.env.JWT_SECRET,
    )
    if(!decode) return res.status(403).json({message:'Invalid token!'})

    if(decode.role === "Admin"){
        const user = await User.findOne({_id:decode.userId,role:decode.role}).select('-password')
    
        if(!user ) return res.status(404).json({message:'user not found'})
        req.user = user 
        next()
    }
    else{
        res.status(403).json({message:"unauthorized admin"})
    }
}