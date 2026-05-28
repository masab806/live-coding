import registerUser from "../services/auth.service"
import loginUser from "../services/auth.service"

export async function RegisterUser(req,res) {
    try {
        const {email, fullName, password} = req.body

        if(!email || !fullName || !password){
            return res.status(400).json({
                success: false,
                message: "All Fields Are Required!"
            })
        }

        const result = await registerUser(email, fullName, password)

        if(!result.success){
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}


export async function LoginUser(email, password) {
    try {
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All Fields Are Required!"
            })
        }

        const result = await loginUser(email, password)

        if(!result.success){
            return res.status(400).json(result)
        }

        return res.status(200).json(result)

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}