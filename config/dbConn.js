import mongoose from "mongoose"; 

export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URI);
        console.log(`mongodb connected on ${conn.connection.host}`)
    }catch(err){
        console.log(`error occured on db connection`);
    } 
}