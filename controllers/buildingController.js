import BuildingOrder from "../model/Building.js"


export const createNewShippingOrder = async(req, res)=>{
    try{
        const {_id:Id} = req.user;
        const order = await BuildingOrder.create({...req.body,userId:Id});   
        res.status(201).json(order) 
    }catch(err){
        if(err.name === "ValidationError"){
            return res.status(400).json({message:"validation error"})
        }
        res.status(400).json({message:err.name})
    }
}

export const getAllOrders = async(req, res)=>{
    const orders = await BuildingOrder.find({})

    if(!orders) return res.status(200).json({message:"no orders available"})
    res.status(200).json({orders, count:orders.length})
}
export const getSingleOrder = async(req, res)=>{
    const {id:orderId} = req.params
    try{
        const order = await BuildingOrder.findOne({_id:orderId})
        if(!order) return res.status(404).json({message:"please check the orderId"})
        res.status(200).json(order)
    }catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message:"cast error: orderId not correct"})
        }
        res.status(404).json({message:err.name})
    }
}
export const updateOrder = async(req, res)=>{
    const {status} = req.body
    const {id:orderId} = req.params
    try{
        const order = await BuildingOrder.findOneAndUpdate({_id:orderId},{status},{new:true,runValidators:true})
        if(!order) return res.status(404).json({message:"please check the orderId"})
        res.status(200).json(order)
    }catch(err){
        if(err.name === "CastError"){
            return res.status(400).json({message:"cast error: orderId not correct"})
        }
        res.status(404).json({message:err.name})
    }
}