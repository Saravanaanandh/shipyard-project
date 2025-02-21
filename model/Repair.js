import mongoose from 'mongoose'

const RepairSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    shipModel:{
        type:String,
        required:true
    },
    shipType:{
        type:String,
        required:true
    },
    yearOfManufacture:{
        type:Number, 
        default:2000,
    },
    issueDescription:{
        type:String, 
        required:true
    },
    complaintDate:{
        type:Date, 
        default:Date.now
    },
    status:{
        type:String,
        enum:["completed", "pending","Inprogress"],
        default:"pending" 
    }
    // {
    //     "_id": "ObjectId",
    //     "userId": "ObjectId",
    //     "shipModel": "Horizon X",
    //     "yearOfManufacture": 2018,
    //     "shipType": "Oil Tanker",
    //     "issueDescription": "Engine overheating",
    //     "complaintDate": "2025-02-21T12:00:00Z",
    //     "repairStatus": [
    //         {
    //             "status": "Inspection Completed",
    //             "date": "2025-02-22T10:00:00Z"
    //         },
    //         {
    //             "status": "Engine Repair in Progress",
    //             "date": "2025-02-23T14:00:00Z"
    //         }
    //     ]
    // }

},{timestamps:true})

const Repair = mongoose.model('Repair', RepairSchema)
export default Repair