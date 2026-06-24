import { api } from '@/lib/api/client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface Teacher {
  id: string
  userId: string
  schoolId: string
  position: string
  subject?: string
  phone: string
  joinedYear: number
  salaryBase: number
  status: string
  user?: {
    id: string
    fullName: string
    email: string
    phone?: string
  }
  workload?: {
    id: string
    weeklyHours: number
    maxHours: number
    status: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateTeacherDto {
  fullName: string
  email: string
  password: string
  phone: string
  position: string
  subject?: string
  joinedYear: number
  salaryBase: number
}

export interface UpdateTeacherDto extends Partial<CreateTeacherDto> {
  id: string
}

/**
 * Teacher service with TanStack Query
 */
export const teacherService = {
  /**
   * Get all teachers
   */
  getAll: async (params?: { position?: string; search?: string }): Promise<Teacher[]> => {
    const response = await api.get('/staff', { params })
    return response.data
  },

  /**
   * Get teacher by ID
   */
  getOne: async (id: string): Promise<Teacher> => {
    const response = await api.get(`/staff/${id}`)
    return response.data
  },

  /**
   * Create teacher
   */
  create: async (data: CreateTeacherDto): Promise<Teacher> => {
    const response = await api.post('/staff', data)
    return response.data
  },

  /**
   * Update teacher
   */
  update: async (id: string, data: Partial<CreateTeacherDto>): Promise<Teacher> => {
    const response = await api.put(`/staff/${id}`, data)
    return response.data
  },

  /**
   * Delete teacher
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/staff/${id}`)
  },

  /**
   * Get teacher workload
   */
  getWorkload: async (teacherId: string): Promise<any> => {
    const response = await api.get(`/staff/${teacherId}/workload`)
    return response.data
  },

  /**
   * Get teacher schedule
   */
  getSchedule: async (teacherId: string, week?: string): Promise<any[]> => {
    const response = await api.get(`/staff/${teacherId}/schedule`, { params: { week } })
    return response.data
  },
}

/**
 * React Query hooks for teachers
 */
export const useTeachers = () => {
  const queryClient = useQueryClient()

  return {
    // Queries
    useAll: (params?: { position?: string; search?: string }) => useQuery({
      queryKey: ['teachers', params],
      queryFn: () => teacherService.getAll(params),
      staleTime: 2 * 60 * 1000,
    }),

    useOne: (id: string) => useQuery({
      queryKey: ['teachers', id],
      queryFn: () => teacherService.getOne(id),
      enabled: !!id,
    }),

    // Mutations
    useCreate: () => useMutation({
      mutationFn: teacherService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teachers'] })
      },
    }),

    useUpdate: () => useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<CreateTeacherDto> }) =>
        teacherService.update(id, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['teachers'] })
        queryClient.invalidateQueries({ queryKey: ['teachers', variables.id] })
      },
    }),

    useDelete: () => useMutation({
      mutationFn: teacherService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['teachers'] })
      },
    }),
  }
}