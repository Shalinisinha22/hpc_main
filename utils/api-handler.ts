import { api } from './auth';

export interface ApiError {
  error: string;
  code: string;
  expiredAt?: string;
  message?: string;
}

export const handleApiCall = async <T>(
  apiCall: () => Promise<T>
): Promise<T> => {
  try {
    return await apiCall();
  } catch (error: any) {
    // Handle specific token expiration error
    if (error.response?.data?.code === 'TOKEN_EXPIRED') {
      console.warn('Token expired:', error.response.data);
      
      // Clear auth data
      localStorage.removeItem('hpcToken');
      localStorage.removeItem('hpcUser');
      
      // Redirect to login
      window.location.href = '/';
      
      throw new Error('Session expired. Please log in again.');
    }
    
    // Handle other API errors
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    
    // Handle network errors
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    throw error;
  }
};


export const makeAuthenticatedRequest = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {
  const token = localStorage.getItem('hpcToken');
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });
  
  // Check for token expiration in response
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    if (errorData.code === 'TOKEN_EXPIRED') {
      localStorage.removeItem('hpcToken');
      localStorage.removeItem('hpcUser');
      window.location.href = '/';
      throw new Error('Session expired. Please log in again.');
    }
    
    throw new Error(errorData.error || errorData.message || 'Request failed');
  }
  
  return response;
};


export const makeRequest = async (
  url: string, 
  options: RequestInit = {}
): Promise<Response> => {

  

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    
    
    throw new Error(errorData.error || errorData.message || 'Request failed');
  }
  
  return response;
};