import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-register-users-tau.vercel.app/'
})

export default api
