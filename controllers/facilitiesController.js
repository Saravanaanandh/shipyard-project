import Facilities from "../model/Facilities.js";

export const AddNewFacility = async(req, res)=>{
    try{
        const facility = await Facilities.create({...req.body}); 
        res.status(201).json(facility) 
    }catch(err){
        if(err.name === "ValidationError"){
            return res.status(400).json({message:"validation error"})
        }
        res.status(400).json({message:err.name})
    }
}
export const getAllFacilities = async(req, res)=>{
    const facilities = await Facilities.find({})

    if(!facilities) return res.status(200).json({message:"it contain no facilities"})
    res.status(200).json({facilities, count:facilities.length})
}
export const getSingleFacility = async(req, res)=>{
    const {id:facilityId} = req.params
    try{
        const facility = await Facilities.findOne({_id:facilityId})
        if(!facility) return res.status(404).json({message:"please check the facilityid"})
        res.status(200).json(facility)
    }catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message:"cast error: engineerId not correct"})
        }
        res.status(404).json({message:err.name})
    }
}