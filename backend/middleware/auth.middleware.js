import jwt from "jsonwebtoken"

export async function AuthMiddleware(req,res,next) {
    try {
        const authHeaders = req.headers.authorization

        if(!authHeaders || !authHeaders.startsWith("Bearer ")){
            return res.status(400).json({
                error: "No Headers!"
            })
        }

        const token = authHeaders.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()


    } catch (error) {
        console.log("An Error Occured: ", error)
    }
}