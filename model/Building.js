import mongoose from 'mongoose'

const BuildingOrderSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    budget:{
        type:Number, 
        required:true
    },
    preferredTechnology:{
        type:String,
        default:"",
    },
    shipType:{
        type:String,
        default:"",
    },
    orderedDate:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:["processing", "completed"],
        default:"processing"
    }, 
    // {
    //     "_id": "ObjectId",
    //     "userId": "ObjectId", // Reference to Users Collection (if applicable)
    //     "budget": 1000000,
    //     "preferredTechnology": "Composite Hull",
    //     "shipType": "Cargo",
    //     "orderDate": "2025-02-21T12:00:00Z",
    //     "status": "Processing"
    // }
},{timestamps:true})

const BuildingOrder = mongoose.model('BuildingOrder',BuildingOrderSchema)
export default BuildingOrder