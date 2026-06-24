import { api } from '@/lib/api/client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export interface AttendanceRecord {
  id: string
  studentId: string
  studentName: string
  className: string
  date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  method: 'manual' | 'qr' | 'face_id'
  recordedBy?: string
  notes?: string
}

export interface AttendanceStats {
  totalDays: number
  presentDays: number
  absentDays: number
  lateDays: number
  attendanceRate: number
}

export interface MarkAttendanceDto {
  studentId: string
  classId: string
  date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  method?: 'manual' | 'qr' | 'face_id'
  notes?: string
}

export interface BulkAttendanceDto {
  classId: string
  date: string
  attendance: {
    studentId: string
    status: 'present' | 'absent' | 'late' | 'excused'
  }[]
}

/**
 * Attendance service with TanStack Query
 */
export const attendanceService = {
  /**
   * Get attendance records
   */
  getRecords: async (params?: { classId?: string; studentId?: string; month?: string; date?: string }): Promise<AttendanceRecord[]> => {
    const response = await api.get('/attendance', { params })
    return response.data
  },

  /**
   * Get attendance by date and class
   */
  getByDateAndClass: async (classId: string, date: string): Promise<AttendanceRecord[]> => {
    const response = await api.get('/attendance', { params: { classId, date } })
    return response.data
  },

  /**
   * Get student attendance history
   */
  getStudentHistory: async (studentId: string, month?: string): Promise<AttendanceRecord[]> => {
    const response = await api.get(`/attendance/student/${studentId}`, { params: { month } })
    return response.data
  },

  /**
   * Get attendance statistics
   */
  getStats: async (params?: { classId?: string; studentId?: string; month?: string; date?: string }): Promise<AttendanceStats> => {
    const response = await api.get('/attendance/stats', { params })
    return response.data
  },

  /**
   * Mark attendance for single student
   */
  mark: async (data: MarkAttendanceDto): Promise<AttendanceRecord> => {
    const response = await api.post('/attendance/mark', data)
    return response.data
  },

  /**
   * Mark attendance for multiple students (bulk)
   */
  markBulk: async (data: BulkAttendanceDto): Promise<void> => {
    await api.post('/attendance/bulk', data)
  },

  /**
   * Update attendance record
   */
  update: async (id: string, data: Partial<MarkAttendanceDto>): Promise<AttendanceRecord> => {
    const response = await api.put(`/attendance/${id}`, data)
    return response.data
  },

  /**
   * Delete attendance record
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/attendance/${id}`)
  },

  /**
   * Face ID attendance
   */
  faceIdAttendance: async (classId: string, imageData: string): Promise<{ success: boolean; students: any[] }> => {
    const response = await api.post('/attendance/face-check', { classId, imageData })
    return response.data
  },

  /**
   * QR code attendance
   */
  qrAttendance: async (qrCode: string, classId: string): Promise<{ success: boolean; student: any }> => {
    const response = await api.post('/attendance/qr-scan', { qrCode, classId })
    return response.data
  },
}

/**
 * React Query hooks for attendance
 */
export const useAttendance = () => {
  const queryClient = useQueryClient()

  return {
    // Queries
    useRecords: (params?: { classId?: string; studentId?: string; month?: string; date?: string }) => useQuery({
      queryKey: ['attendance', params],
      queryFn: () => attendanceService.getRecords(params),
      staleTime: 1 * 60 * 1000, // 1 minute
    }),

    useByDateAndClass: (classId: string, date: string) => useQuery({
      queryKey: ['attendance', 'class', classId, date],
      queryFn: () => attendanceService.getByDateAndClass(classId, date),
      enabled: !!classId && !!date,
    }),

    useStudentHistory: (studentId: string, month?: string) => useQuery({
      queryKey: ['attendance', 'student', studentId, month],
      queryFn: () => attendanceService.getStudentHistory(studentId, month),
      enabled: !!studentId,
    }),

    useStats: (params?: { classId?: string; studentId?: string; month?: string }) => useQuery({
      queryKey: ['attendance', 'stats', params],
      queryFn: () => attendanceService.getStats(params),
      staleTime: 2 * 60 * 1000,
    }),

    // Mutations
    useMark: () => useMutation({
      mutationFn: attendanceService.mark,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attendance'] })
      },
    }),

    useMarkBulk: () => useMutation({
      mutationFn: attendanceService.markBulk,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attendance'] })
      },
    }),

    useUpdate: () => useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<MarkAttendanceDto> }) =>
        attendanceService.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attendance'] })
      },
    }),

    useDelete: () => useMutation({
      mutationFn: attendanceService.delete,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attendance'] })
      },
    }),

    useFaceId: () => useMutation({
      mutationFn: ({ classId, imageData }: { classId: string; imageData: string }) =>
        attendanceService.faceIdAttendance(classId, imageData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attendance'] })
      },
    }),

    useQrScan: () => useMutation({
      mutationFn: ({ qrCode, classId }: { qrCode: string; classId: string }) =>
        attendanceService.qrAttendance(qrCode, classId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['attendance'] })
      },
    }),
  }
}