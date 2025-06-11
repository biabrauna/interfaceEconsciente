import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
})

// Add a response interceptor to handle CORS errors
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Handle specific error cases
            if (error.response.status === 401) {
                // Handle unauthorized access
                console.error('Unauthorized access');
            } else if (error.response.status === 403) {
                // Handle forbidden access
                console.error('Forbidden access');
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request
            console.error('Error setting up request:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api
