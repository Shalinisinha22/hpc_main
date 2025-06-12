export interface AuthResponse {
  result: {
    name: string
    email: string
    phone: number
    role: string
    token: string
    message: string
  }
  success: boolean
}

export interface User {
  _id?: string
  name: string
  email: string
  phone: number
  role: 'user' | 'admin' | 'Front Office' | 'HR' | 'Bqt Service' | 'Account'
  status: 'active' | 'inactive'
  cdate: Date
  bookingIds: string[]
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  phone: number
  role?: 'user' | 'admin' | 'Front Office' | 'HR' | 'Bqt Service' | 'Account'
}

export interface LoginRequest {
  email: string
  password: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  phone?: number
  role?: 'user' | 'admin' | 'Front Office' | 'HR' | 'Bqt Service' | 'Account'
  status?: 'active' | 'inactive'
}