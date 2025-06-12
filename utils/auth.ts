import axios from 'axios';
import { useRouter } from 'next/navigation';

// Create axios instance with default config
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'
});

// Add request interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hpcToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and user data
      localStorage.removeItem('hpcToken');
      localStorage.removeItem('userData');
      
      // Redirect to login
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Hook to check auth status
export const useAuth = () => {
  const router = useRouter();

  const checkAuth = () => {
    const token = localStorage.getItem('hpcToken');
    if (!token) {
      router.push('/');
      return false;
    }
    return true;
  };

  return { checkAuth };
};