import express from "express"
import { AddUserToRoom, CreateLiveRoom, DeleteRoomById, FetchAllRooms, fetchRoomId, SaveRoom } from "../controllers/live.controller.js"
import { AuthMiddleware } from "../middleware/auth.middleware.js"


const router = express.Router()

router.get("/room", AuthMiddleware, fetchRoomId)
router.get("/allRooms", AuthMiddleware, FetchAllRooms)
router.post("/saveRoom", AuthMiddleware, SaveRoom)
router.delete("/deleteRoom", AuthMiddleware, DeleteRoomById)

export default router