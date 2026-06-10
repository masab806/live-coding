import express from "express"
import { RegisterUser, LoginUser, GetUserByName } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)
router.post("/getUsers", GetUserByName)

export default router