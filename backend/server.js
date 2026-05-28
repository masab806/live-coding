import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import ConnectToDb from "./config/db.js"

dotenv.config()

const app = express()

ConnectToDb()

app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173"
}))

app.get("/health", (req,res)=>{
    return res.status(200).json({
        success: true,
        message: "API IS WORKING!"
    })
})

app.listen(3000, ()=> {
    console.log("App is Running at PORT 3000")
})

