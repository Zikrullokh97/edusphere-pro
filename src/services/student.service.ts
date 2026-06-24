import { api } from '@/lib/api/client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface Student {
  id: string
  userId: string
  schoolId: string
  classId: string
  fullName: string
  gender: 'MALE' | 'FEMALE'
  birthDate: string
  address?: string
  phone?: string
  parentId?: string
  parent?: {
    id: string
    fullName: string
    phone: string
  }
  attendanceRate?: number
  class?: {
    id: string
    name: string
    room: string
    classTeacher: string
  }
  createdAt: string
  updatedAt: string
}

export interface CreateStudentDto {
  fullName: string
  gender: 'MALE' | 'FEMALE'
  birthDate: string
  address?: string
  phone?: string
  classId: string
  parentId?: string
}

export interface UpdateStudentDto extends Partial<CreateStudentDto> {
  id: string
}

/**
 * Student service with TanStack Query
 */
export const studentService = {
  /**
   * Get all students
   */
  getAll: async (params?: { classId?: string; search?: string }): Promise<Student[]> => {
    const response = await api.get('/students', { params })
    return response.data
  },

  /**
   * Get student by ID
   */
  getOne: async (id: string): Promise<Student> => {
    const response = await api.get(`/students/${id}`)
    return response.data
  },

  /**
   * Create student
   */
  create: async (data: CreateStudentDto): Promise<Student> => {
    const response = await api.post('/students', data)
    return response.data
  },

  /**
   * Update student
   */
  update: async (id: string, data: Partial<CreateStudentDto>): Promise<Student> => {
    const response = await api.put(`/students/${id}`, data)
    return response.data
  },

  /**
   * Delete student
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/students/${id}`)
  },

  /**
   * Get student attendance
   */
  getAttendance: async (studentId: string, month?: string): Promise<any[]> => {
    const response = await api.get(`/students/${studentId}/attendance`, { params: { month } })
    return response.data
  },

  /**
   * Get student grades
   */
  getGrades: async (studentId: string): Promise<any[]> => {
    const response = await api.get(`/students/${studentId}/grades`)
    return response.data
  },
}

/**
 * React Query hooks for students
 */
export const useStudents = () => {
  const queryClient = useQueryClient()

  return {
    // Queries
    useAll: (params?: { classId?: string; search?: string }) => useQuery({
      queryKey: ['students', params],
      queryFn: () => studentService.getAll(params),
      staleTime: 2 * 60 * 1000, // 2 minutes
    }),

    useOne: (id: string) => useQuery({
      queryKey: ['students', id],
      queryFn: () => studentService.getOne(id),
      enabled: !!id,
    }),

    // Mutations
    useCreate: () => useMutation({
      mutationFn: studentService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['students'] })
      },
    }),

    useUpdate: () => useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<CreateStudentDto> }) =>
        studentService.update(id, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['students'] })
        queryClient.invalidateQueries({ queryKey: ['students', variables.id] })
      },
    }),

    useDelete: () => useMutation({
      mutationFn: studentService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['students'] })
      },
    }),
  }
}