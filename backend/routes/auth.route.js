import express from "express"
import { RegisterUser, LoginUser, GetUserByName, passwordReset, SendOtp } from "../controllers/auth.controller.js"
import { AuthMiddleware } from "../middleware/auth.middleware.js"


const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)
router.post("/getUsers", AuthMiddleware, GetUserByName)
router.post("/forgot", SendOtp)
router.post('/reset', passwordReset)

export default router