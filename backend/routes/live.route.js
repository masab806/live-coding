import express from "express"
import { AddUserToRoom, CreateLiveRoom } from "../controllers/live.controller.js"
const router = express.Router()

// router.post("/create:id", CreateLiveRoom)
// router.post("/add:userId:participantId", AddUserToRoom)

export default router