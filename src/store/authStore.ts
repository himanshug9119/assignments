import { create } from 'zustand';
import { auth } from '../services/api';
import { AuthState } from '../types';

const authStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: async (email: string, password: string) => {
    try {
      const { user, token } = await auth.login(email, password);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true });
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  },
  
  register: async (email: string, password: string, name: string) => {
    try {
      const { user, token } = await auth.register(name, email, password);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      set({ user, isAuthenticated: true });
    } catch (error) {
      throw new Error('Registration failed');
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },
}));

export default authStore;