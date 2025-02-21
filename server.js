import express from 'express'
import { connectDB } from './config/dbConn.js';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js' 
import buildingRoutes from './routes/building.route.js' 
import repairRoutes from './routes/repair.route.js' 
import EngineerRoutes from './routes/engineers.route.js' 
import financialRoutes from './routes/financial.route.js' 
import facilitiesRoutes from './routes/facilities.route.js' 
import { authendicatedUser } from './middlewares/auth.middleware.js';
import cors from 'cors'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cookieParser()) 
app.use(express.json({ limit: "50mb" }));
app.use(cors({
    origin:"http://127.0.0.1:5500",
    methods: "GET,POST,PATCH,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials:true
}))
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/orders',authendicatedUser,buildingRoutes)
app.use('/api/v1/repairs',authendicatedUser,repairRoutes)
app.use('/api/v1/engineers',authendicatedUser,EngineerRoutes)
app.use('/api/v1/financials',authendicatedUser,financialRoutes)
app.use('/api/v1/facilities',authendicatedUser,facilitiesRoutes)

app.listen(PORT, ()=>{ 
    console.log(`Server running on ${PORT}`);
    connectDB()
})