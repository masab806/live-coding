import express from "express"
import { AddUserToRoom, CreateLiveRoom, FetchAllRooms, fetchRoomId } from "../controllers/live.controller.js"


const router = express.Router()

router.get("/room/:userId", fetchRoomId)
router.get("/allRooms", FetchAllRooms)

export default router