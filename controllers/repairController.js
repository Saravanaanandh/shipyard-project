import Repair from "../model/Repair.js";


export const submitRepairComplaint = async(req, res)=>{
    try{
        const {_id:userId} = req.user;
        const repairComplaint = await Repair.create({...req.body,userId});  
        res.status(201).json(repairComplaint) 

    }catch(err){
        if(err.name === "ValidationError"){
            return res.status(400).json({message:"validation error"})
        }
        res.status(400).json({message:err.name})
    }
}
export const getAllRepairs = async(req, res)=>{
    const repairs = await Repair.find({})

    if(!repairs) return res.status(200).json({message:"no repairs available"})
    res.status(200).json({repairs, count:repairs.length})
}
export const getSingleRepair = async(req, res)=>{
    const {id:repairEmail} = req.params
    try{
        const repair = await Repair.findOne({email:repairEmail})
        if(!repair) return res.status(404).json({message:"please check the repairId"})
        res.status(200).json(repair)
    }catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message:"cast error: repairId not correct"})
        }
        res.status(404).json({message:err.name})
    }
}
export const updateRepair = async(req, res)=>{
    const {repairStatus} = req.body
    const {id:repairId} = req.params
    try{
        const repair = await Repair.findOneAndUpdate({_id:repairId},{repairStatus},{new:true,runValidators:true})
        if(!repair) return res.status(404).json({message:"please check the repairId"})
        res.status(200).json(repair)
    }catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message:"cast error: repairId not correct"})
        }
        res.status(404).json({message:err.name})
    }
} 
