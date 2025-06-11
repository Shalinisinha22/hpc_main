export interface AuthResponse {
  result: {
    name: string
    email: string
    role: string
    token: string
    message: string
  }
  success: boolean
}

export interface User {
  name: string
  email: string
  role: string
}