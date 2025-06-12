import { env } from '@/config/env'
import type { AuthResponse } from '@/types/auth'

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: number;
  role: string;
}

export const authService = {
  async register(data: RegisterData) {
    try {
      const response = await fetch(`${env.API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${env.API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      return data
    } catch (error) {
      throw error
    }
  }
};