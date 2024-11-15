import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Updated to use relative path
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
);

export const auth = {
  login: async (email: string, password: string) => {
    try {
      const { data } = await api.post('/users/login', { email, password });
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (name: string, email: string, password: string) => {
    try {
      const { data } = await api.post('/users/register', { name, email, password });
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  getProfile: async () => {
    const { data } = await api.get('/users/profile');
    return data;
  },
};

export const cars = {
  getAll: async () => {
    const { data } = await api.get('/cars');
    return data;
  },
  
  getOne: async (id: string) => {
    const { data } = await api.get(`/cars/${id}`);
    return data;
  },
  
  create: async (carData: any) => {
    const { data } = await api.post('/cars', carData);
    return data;
  },
  
  update: async (id: string, carData: any) => {
    const { data } = await api.patch(`/cars/${id}`, carData);
    return data;
  },
  
  delete: async (id: string) => {
    const { data } = await api.delete(`/cars/${id}`);
    return data;
  },
  
  search: async (query: string) => {
    const { data } = await api.get(`/cars/search?q=${query}`);
    return data;
  },
};