import express from "express"
import { AddUserToRoom, CreateLiveRoom, fetchRoomId } from "../controllers/live.controller.js"


const router = express.Router()

router.get("/room/:userId", fetchRoomId)

export default router