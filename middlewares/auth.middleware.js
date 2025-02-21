
// import jwt from 'jsonwebtoken'
// import User from  '../model/User.js'

// export const authendicatedUser = async (req, res, next)=>{
//     const cookies = req.cookies
//     if(!cookies?.jwt)   return res.status(401).json({message:'Unauthorized user'})
    
//     const token = cookies.jwt
//     jwt.verify(
//         token,
//         process.env.JWT_SECRET,
//         (err, decoded)=>{
//             if(err) return res.status(403)
//             req.user = decoded.userInfo.userId
//             req.roles = decoded.userInfo.roles
//             next()
//         }
//     )
// }

import jwt from 'jsonwebtoken';
import User from '../model/User.js';

export const authendicatedUser = async (req, res, next) => {
    try { 
        if (!req.cookies || !req.cookies.jwt) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }

        const token = req.cookies.jwt; 
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden: Invalid Token' });
            } 
            const user = await User.findById(decoded.userInfo.userId);
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized: User not found' });
            } 
            console.log(user)
            req.user = user;
            req.roles = user.roles;

            next();
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}; 
 