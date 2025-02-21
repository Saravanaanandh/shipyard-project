import mongoose from 'mongoose'

const FacilitiesSchema = new mongoose.Schema({
    facilityName:{
        type:String, 
        required:true
    },
    description:{
        type:String,
        default:"",
    }, 
    capacity:{
        type:String,  
        required:true
    },
    imageURL:{
        type:String,   
        default:""
    },

    // {
    //     "_id": "ObjectId",
    //     "facilityName": "Dry Dock 1",
    //     "description": "Used for ship maintenance and repairs.",
    //     "capacity": "10,000 Tons",
    //     "imageURL": "https://shipyard.com/images/drydock1.jpg"
    // }
},{timestamps:true})

const Facilities = mongoose.model('Facilities',FacilitiesSchema)
export default Facilities