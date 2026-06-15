import express from "express"
import { AddUserToRoom, CreateLiveRoom, FetchAllRooms, fetchRoomId } from "../controllers/live.controller.js"
import { AuthMiddleware } from "../middleware/auth.middleware.js"


const router = express.Router()

router.get("/room", AuthMiddleware, fetchRoomId)
router.get("/allRooms", FetchAllRooms)

export default router