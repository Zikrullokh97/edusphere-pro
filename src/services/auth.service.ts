import { api } from '@/lib/api/client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface User {
  id: string
  email: string
  fullName: string
  phone?: string
  avatar?: string
  role: string
  status: string
  schoolId?: string
  school?: {
    id: string
    name: string
    address?: string
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  fullName: string
  email: string
  password: string
  phone?: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  user: User
}

/**
 * Auth service with TanStack Query
 */
export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  /**
   * Register new user
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  /**
   * Refresh access token
   */
  refreshToken: async (refreshToken: string): Promise<{ access_token: string }> => {
    const response = await api.post('/auth/refresh', { refresh_token: refreshToken })
    return response.data
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/me')
    return response.data
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email })
  },
}

/**
 * React Query hooks for authentication
 */
export const useAuth = () => {
  const queryClient = useQueryClient()

  return {
    // Queries
    useProfile: () => useQuery({
      queryKey: ['auth', 'profile'],
      queryFn: authService.getProfile,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }),

    // Mutations
    useLogin: () => useMutation({
      mutationFn: authService.login,
      onSuccess: (data) => {
        // Store tokens
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['auth'] })
      },
    }),

    useRegister: () => useMutation({
      mutationFn: authService.register,
      onSuccess: (data) => {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        queryClient.invalidateQueries({ queryKey: ['auth'] })
      },
    }),

    useLogout: () => useMutation({
      mutationFn: authService.logout,
      onSuccess: () => {
        // Clear storage
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user')
        
        // Clear all queries
        queryClient.clear()
      },
    }),

    useForgotPassword: () => useMutation({
      mutationFn: authService.forgotPassword,
    }),
  }
}