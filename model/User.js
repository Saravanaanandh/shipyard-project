
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import ROLES_LIST from '../config/roles_list.js'

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    mobile:{
        type:Number,
        required:true,
    },
    profile:{
        type:String,
        default:""
    },
    roles: {
        type: [Number],  
        default: [ROLES_LIST.Client], 
        required: true
    },
    token:String
},{timestamps:true})

UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10) 
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.createJWT = function(){
    return jwt.sign(
        {
            userInfo:{
                userId:this._id,
                roles:this.roles
            }
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'30d'
        }
    )
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password) 
    return isMatch
}

const User = mongoose.model("User", UserSchema); 
export default User;   

