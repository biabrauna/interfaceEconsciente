  import api from './api';

  export const login = async (email, password) => {
    const response = await api.post('/auth/user', { email, password });

    localStorage.setItem('token', response.data.access_token);

    return response.data;
  };

  export const logout = async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
  };

  export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
  };