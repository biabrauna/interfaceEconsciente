import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000'
    // local que ta o back-end
})

export default api