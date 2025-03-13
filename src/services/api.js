import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-register-users-ny35.onrender.com/'
})

export default api
