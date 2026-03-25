import express, { json } from "express"
import env from "dotenv"
import dbConnect from "./src/config/dbConnect.js"
import authRoutes from "./src/routes/authRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"
import cors from "cors"

// Load environment variables FIRST
env.config({path : "./src/.env"})

// Then connect to database
dbConnect()


const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use("/users",userRoutes)


const port = process.env.PORT || 8900

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})