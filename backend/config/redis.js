import {Redis} from "ioredis"

const client = new Redis(process.env.REDIS_URL || "http://localhost:6739")

module.exports = client