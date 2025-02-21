import Engineers from "../model/Engineers.js";

export const AddNewEngineer = async(req, res)=>{
    try{
        const engineer = await Engineers.create({...req.body}); 
        res.status(201).json(engineer) 
    }catch(err){
        if(err.name === "ValidationError"){
            return res.status(400).json({message:"validation error"})
        }
        res.status(400).json({message:err.name})
    }
}
export const getAllEngineers = async(req, res)=>{
    const engineers = await Engineers.find({})

    if(!engineers) return res.status(200).json({message:"no engineers are found"})
    res.status(200).json({engineers, count:engineers.length})
}
export const getSingleEngineer = async(req, res)=>{
    const {id:engineerId} = req.params
    try{
        const engineer = await Engineers.findOne({_id:engineerId})
        if(!engineer) return res.status(404).json({message:"please check the engineerId"})
        res.status(200).json(engineer)
    }catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message:"cast error: engineerId not correct"})
        }
        res.status(404).json({message:err.name})
    }
}
export const updateEngineer = async(req, res)=>{
    const {designation,experience} = req.body
    const {id:engineerId} = req.params
    try{
        const engineer = await Engineers.findOneAndUpdate({_id:engineerId},{designation,experience},{new:true,runValidators:true})
        if(!engineer) return res.status(404).json({message:"please check the engineerId"})
        res.status(200).json(engineer)
    }catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message:"cast error: engineerId not correct"})
        }
        res.status(404).json({message:err.name})
    }
}