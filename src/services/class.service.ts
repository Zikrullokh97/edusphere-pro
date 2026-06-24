import { api } from '@/lib/api/client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface SchoolClass {
  id: string
  schoolId: string
  name: string
  room: string
  classTeacher: string
  studentCount: number
  boys: number
  girls: number
  attendanceRate?: number
  createdAt: string
  updatedAt: string
}

export interface CreateClassDto {
  name: string
  room: string
  classTeacher: string
}

export interface UpdateClassDto extends Partial<CreateClassDto> {
  id: string
}

/**
 * Class service with TanStack Query
 */
export const classService = {
  /**
   * Get all classes
   */
  getAll: async (params?: { schoolId?: string; search?: string }): Promise<SchoolClass[]> => {
    const response = await api.get('/classes', { params })
    return response.data
  },

  /**
   * Get class by ID
   */
  getOne: async (id: string): Promise<SchoolClass> => {
    const response = await api.get(`/classes/${id}`)
    return response.data
  },

  /**
   * Create class
   */
  create: async (data: CreateClassDto): Promise<SchoolClass> => {
    const response = await api.post('/classes', data)
    return response.data
  },

  /**
   * Update class
   */
  update: async (id: string, data: Partial<CreateClassDto>): Promise<SchoolClass> => {
    const response = await api.put(`/classes/${id}`, data)
    return response.data
  },

  /**
   * Delete class
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/classes/${id}`)
  },

  /**
   * Get class students
   */
  getStudents: async (classId: string): Promise<any[]> => {
    const response = await api.get(`/classes/${classId}/students`)
    return response.data
  },

  /**
   * Get class schedule
   */
  getSchedule: async (classId: string): Promise<any[]> => {
    const response = await api.get(`/classes/${classId}/schedule`)
    return response.data
  },
}

/**
 * React Query hooks for classes
 */
export const useClasses = () => {
  const queryClient = useQueryClient()

  return {
    // Queries
    useAll: (params?: { schoolId?: string; search?: string }) => useQuery({
      queryKey: ['classes', params],
      queryFn: () => classService.getAll(params),
      staleTime: 3 * 60 * 1000, // 3 minutes
    }),

    useOne: (id: string) => useQuery({
      queryKey: ['classes', id],
      queryFn: () => classService.getOne(id),
      enabled: !!id,
    }),

    useStudents: (classId: string) => useQuery({
      queryKey: ['classes', classId, 'students'],
      queryFn: () => classService.getStudents(classId),
      enabled: !!classId,
    }),

    useSchedule: (classId: string) => useQuery({
      queryKey: ['classes', classId, 'schedule'],
      queryFn: () => classService.getSchedule(classId),
      enabled: !!classId,
    }),

    // Mutations
    useCreate: () => useMutation({
      mutationFn: classService.create,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['classes'] })
      },
    }),

    useUpdate: () => useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<CreateClassDto> }) =>
        classService.update(id, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ['classes'] })
        queryClient.invalidateQueries({ queryKey: ['classes', variables.id] })
      },
    }),

    useDelete: () => useMutation({
      mutationFn: classService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['classes'] })
      },
    }),
  }
}