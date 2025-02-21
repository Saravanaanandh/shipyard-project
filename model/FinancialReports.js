import mongoose from 'mongoose'

const financialreportsSchema = new mongoose.Schema({
    shipId:{
        type:mongoose.Types.ObjectId,
        ref:'Building', 
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
    // {
    //     "_id": "ObjectId",
    //     "shipId": "ObjectId",
    //     "reportType": "Annual Financial Report",
    //     "year": 2024,
    //     "revenue": 50000000,
    //     "expenses": 30000000,
    //     "profit": 20000000,
    //     "reportFileURL": "https://shipyard.com/reports/2024.pdf"
    // }
},{timestamps:true})

const financialreports = mongoose.model('financialreports',financialreportsSchema)
export default financialreports