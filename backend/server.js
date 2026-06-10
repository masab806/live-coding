import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import ConnectToDb from "./config/db.js"
import AuthRouter from "./routes/auth.route.js"
import LiveRouter from "./routes/live.route.js"
import { createServer } from "http"
import { initServer } from "./services/socket.service.js"

dotenv.config()

const app = express()

app.use(cors({
    origin: "http://localhost:5173"
}))

ConnectToDb()

const server = createServer(app)

initServer(server)

app.use(express.json())


app.use("/api/auth", AuthRouter)
app.use("/api/live", LiveRouter)

app.get("/health", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "API IS WORKING!"
    })
})

server.listen(3000, () => {
    console.log("App is Running at PORT 3000")
})

