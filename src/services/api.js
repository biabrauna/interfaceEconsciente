import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-register-users-ny35.onrender.com/'
    // local que ta o back-end
})

export default api