import api from '@/lib/api/client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface AttendanceRecord {
  student_id: string
  student_name: string
  class_id: string
  date: string
  status: 'present' | 'absent' | 'late'
}

export interface GradeRecord {
  student_id: string
  subject: string
  class_id: string
  date: string
  grade: number
  day_index: number
}

export interface ChatMessage {
  id: string
  from: 'teacher' | 'parent'
  text: string
  time: string
  parent_id?: string
}

// ─── API services ─────────────────────────────────────────────────────────────
export const teacherApi = {
  // Attendance
  getAttendance:  (classId: string, date: string) =>
    api.get<AttendanceRecord[]>('/api/teacher/attendance', { params: { class_id: classId, date } }).then(r => r.data),
  saveAttendance: (records: AttendanceRecord[]) =>
    api.post('/api/teacher/attendance', { records }).then(r => r.data),
  sendSMS:        (studentIds: string[], message?: string) =>
    api.post('/api/teacher/sms', { student_ids: studentIds, message }).then(r => r.data),

  // Face ID
  runFaceId:      (classId: string) =>
    api.post<{ recognized: string[] }>('/api/teacher/face-id', { class_id: classId }).then(r => r.data),

  // Grades
  getGrades:      (classId: string, week?: string) =>
    api.get<GradeRecord[]>('/api/teacher/grades', { params: { class_id: classId, week } }).then(r => r.data),
  saveGrades:     (records: GradeRecord[]) =>
    api.post('/api/teacher/grades', { records }).then(r => r.data),

  // Voice grading
  parseVoiceGrades: (transcript: string, classId: string) =>
    api.post<Record<string, number>>('/api/teacher/voice-grades', { transcript, class_id: classId }).then(r => r.data),

  // Schedule
  getMySchedule:  () => api.get('/api/teacher/schedule').then(r => r.data),
  saveLessonTopic:(lessonId: string, topic: string, homework: string) =>
    api.patch(`/api/teacher/schedule/${lessonId}`, { topic, homework }).then(r => r.data),

  // Materials
  uploadFile:     (formData: FormData) =>
    api.post('/api/teacher/materials', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data),
  getFiles:       () => api.get('/api/teacher/materials').then(r => r.data),
  deleteFile:     (id: string) => api.delete(`/api/teacher/materials/${id}`),
  generateTest:   (topic: string, classId: string, count: number) =>
    api.post('/api/teacher/ai-test', { topic, class_id: classId, question_count: count }).then(r => r.data),

  // Chat
  getParents:     () => api.get('/api/teacher/parents').then(r => r.data),
  getMessages:    (parentId: string) =>
    api.get<ChatMessage[]>(`/api/teacher/chat/${parentId}`).then(r => r.data),
  sendMessage:    (parentId: string, text: string) =>
    api.post(`/api/teacher/chat/${parentId}`, { text }).then(r => r.data),
  sendBroadcast:  (target: string, message: string) =>
    api.post('/api/teacher/broadcast', { target, message }).then(r => r.data),
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
export const useTeacherAttendance = (classId: string, date: string) =>
  useQuery({ queryKey: ['teacher-attendance', classId, date], queryFn: () => teacherApi.getAttendance(classId, date), enabled: !!classId })

export const useSaveAttendance = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: teacherApi.saveAttendance,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['teacher-attendance'] }); toast.success('Davomat saqlandi') },
    onError: () => toast.error('Xato yuz berdi'),
  })
}

export const useSendSMS = () =>
  useMutation({
    mutationFn: ({ ids, msg }: { ids: string[]; msg?: string }) => teacherApi.sendSMS(ids, msg),
    onSuccess: () => toast.success('SMS yuborildi'),
  })

export const useTeacherGrades = (classId: string) =>
  useQuery({ queryKey: ['teacher-grades', classId], queryFn: () => teacherApi.getGrades(classId), enabled: !!classId })

export const useSaveGrades = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: teacherApi.saveGrades,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['teacher-grades'] }); toast.success('Baholar saqlandi') },
  })
}

export const useGenerateTest = () =>
  useMutation({
    mutationFn: ({ topic, classId, count }: { topic: string; classId: string; count: number }) =>
      teacherApi.generateTest(topic, classId, count),
    onSuccess: () => toast.success('Test yaratildi'),
    onError: () => toast.error('AI testi yaratishda xato'),
  })

export const useTeacherMessages = (parentId: string) =>
  useQuery({ queryKey: ['teacher-chat', parentId], queryFn: () => teacherApi.getMessages(parentId), enabled: !!parentId })

export const useSendMessage = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ parentId, text }: { parentId: string; text: string }) => teacherApi.sendMessage(parentId, text),
    onSuccess: (_, { parentId }) => qc.invalidateQueries({ queryKey: ['teacher-chat', parentId] }),
  })
}

export const useSendBroadcast = () =>
  useMutation({
    mutationFn: ({ target, message }: { target: string; message: string }) => teacherApi.sendBroadcast(target, message),
    onSuccess: () => toast.success('Xabar yuborildi'),
  })
