import financialreports from "../model/FinancialReports.js";


export const UploadFinancial = async(req, res)=>{
    try{
        const financialReport = await financialreports.create({...req.body}); 
        res.status(201).json(financialReport) 
    }catch(err){
        if(err.name === "ValidationError"){
            return res.status(400).json({message:"validation error"})
        }
        res.status(400).json({message:err.name})
    }
}
export const getAllFinancials = async(req, res)=>{
    const financialReports = await financialreports.find({})

    if(!financialReports) return res.status(200).json({message:"no financialReports available"})
    res.status(200).json({financialReports, count:financialReports.length})
}
export const getSingleFinancial = async(req, res)=>{
    const {id:financialReportId} = req.params
    try{
        const financialReport = await financialreports.findOne({_id:financialReportId})
        if(!financialReport) return res.status(404).json({message:"please check the financialReportId"})
        res.status(200).json(financialReport)
    }catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message:"cast error: financialReportId not correct"})
        }
        res.status(404).json({message:err.name})
    }
}
export const updateFinancial = async(req, res)=>{
    const {revenue,expenses,reportFileURL,profit} = req.body
    const {id:financialReportId} = req.params
    try{
        const financialReport = await Engineers.findOneAndUpdate({_id:financialReportId},{revenue,expenses,reportFileURL,profit},{new:true,runValidators:true})
        if(!financialReport) return res.status(404).json({message:"please check the financialReportId"})
        res.status(200).json(financialReport)
    }catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message:"cast error: financialReportId not correct"})
        }
        res.status(404).json({message:err.name})
    }
}