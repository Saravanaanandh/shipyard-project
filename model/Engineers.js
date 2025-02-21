import mongoose from 'mongoose'

const EngineersSchema = new mongoose.Schema({
    
    name:{
        type:String, 
        required:true
    },
    designation:{
        type:String,
        default:"",
    },
    experience:{
        type:String,
        default:"",
    }, 
    expertise:{
        type:String,
        enum:["Hydrodynamics", "Naval Architecture","others"], 
        required:true
    }, 
    email:{
        type:String,
        required:true, 
        match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    // {
    //     "_id": "ObjectId",
    //     "name": "Dr. John Doe",
    //     "designation": "Senior Marine Engineer",
    //     "experience": "15 years",
    //     "expertise": ["Hydrodynamics", "Naval Architecture"],
    //     "contactEmail": "johndoe@shipyard.com"
    // }
},{timestamps:true})

const Engineers = mongoose.model('Engineers',EngineersSchema)
export default Engineers