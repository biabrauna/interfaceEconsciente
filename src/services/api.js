import axios from 'axios';

// Crie a instância do axios
const api = axios.create({
  baseURL: 'http://localhost:3000/',
});

// Interceptor para adicionar o token JWT em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Pegue o token do localStorage ou de onde você armazenou

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token no cabeçalho
    }

    return config; // Retorna a configuração da requisição
  },
  (error) => {
    return Promise.reject(error); // Se houver erro na requisição, o erro é rejeitado
  }
);

// Interceptor para lidar com os erros de resposta
api.interceptors.response.use(
  (response) => response, // Retorna a resposta normalmente
  (error) => {
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
    return Promise.reject(error); // Retorna o erro para ser tratado onde o axios for chamado
  }
);

export default api;
