import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json'
    }
})



// api.interceptors.request.use(
//     (config)=> {
        
//     }
// )


export default api