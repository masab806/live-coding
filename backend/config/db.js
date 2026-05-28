import mongoose from "mongoose";

async function ConnectToDb() {
    try {
        const mongoURL = process.env.MONGO_URL

        if(!mongoURL){
            throw new Error("No Mongo URL Found!")
        }

        await mongoose.connect(mongoURL).then(()=>{
            console.log("Connectd To DB!")
        })

    } catch (error) {
        console.log("Error While Connecting To Database", error)
    }
}

export default ConnectToDb