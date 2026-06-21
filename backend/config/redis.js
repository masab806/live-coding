import Redis from "ioredis"

const client = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
    maxRetriesPerRequest: null, 
    showFriendlyErrorStack: true 
})

client.on("connect", ()=> {
    console.log("Redis Connected..")
})

client.on("error", (err)=> {
    console.log("Error: ", err)
})

export default client