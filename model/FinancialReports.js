import mongoose from 'mongoose'

const financialreportsSchema = new mongoose.Schema({
    shipId:{
        type:String, 
        required:true
    },
    reportType:{
        type:String, 
        required:true
    },
    year:{
        type:Date,
        default:Date.now,
    },
    revenue:{
        type:Number,
        required:true
    }, 
    expenses:{
        type:Number,
        required:true
    }, 
    profit:{
        type:Number,
        required:true
    }, 
    reportFileURL:{
        type:String,
        required:true
    },
     
},{timestamps:true})

const financialreports = mongoose.model('financialreports',financialreportsSchema)
export default financialreports