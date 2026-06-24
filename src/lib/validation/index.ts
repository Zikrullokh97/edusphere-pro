import { z } from 'zod'

// Student validation schema
export const studentSchema = z.object({
  fullName: z.string().min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak'),
  gender: z.enum(['MALE', 'FEMALE'], {
    required_error: 'Jinsni tanlang',
  }),
  birthDate: z.string().min(1, 'Tug\'ilgan sanani kiriting'),
  phone: z.string().optional(),
  address: z.string().optional(),
  classId: z.string().min(1, 'Sinfni tanlang'),
  parentId: z.string().optional(),
})

export type StudentFormData = z.infer<typeof studentSchema>

// Teacher validation schema
export const teacherSchema = z.object({
  fullName: z.string().min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak'),
  email: z.string().email('Noto\'g\'ri email format'),
  password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat').optional(),
  phone: z.string().min(1, 'Telefon raqamini kiriting'),
  position: z.string().min(1, 'Lavozimni kiriting'),
  subject: z.string().optional(),
  joinedYear: z.number().min(1900, 'Yilni to\'g\'ri kiriting').max(new Date().getFullYear()),
  salaryBase: z.number().min(0, 'Maosh 0 dan katta bo\'lishi kerak'),
})

export type TeacherFormData = z.infer<typeof teacherSchema>

// Class validation schema
export const classSchema = z.object({
  name: z.string().min(1, 'Sinf nomini kiriting'),
  room: z.string().min(1, 'Xona raqamini kiriting'),
  classTeacher: z.string().min(1, 'O\'qituvchini tanlang'),
})

export type ClassFormData = z.infer<typeof classSchema>

// Attendance validation schema
export const attendanceSchema = z.object({
  studentId: z.string().min(1, 'O\'quvchini tanlang'),
  classId: z.string().min(1, 'Sinfni tanlang'),
  date: z.string().min(1, 'Sanani kiriting'),
  status: z.enum(['present', 'absent', 'late', 'excused'], {
    required_error: 'Holatni tanlang',
  }),
  method: z.enum(['manual', 'qr', 'face_id']).optional(),
  notes: z.string().optional(),
})

export type AttendanceFormData = z.infer<typeof attendanceSchema>

// Bulk attendance schema
export const bulkAttendanceSchema = z.object({
  classId: z.string().min(1, 'Sinfni tanlang'),
  date: z.string().min(1, 'Sanani kiriting'),
  attendance: z.array(
    z.object({
      studentId: z.string(),
      status: z.enum(['present', 'absent', 'late', 'excused']),
    })
  ).min(1, 'Kamida bitta o\'quvchi tanlang'),
})

export type BulkAttendanceFormData = z.infer<typeof bulkAttendanceSchema>

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email('Noto\'g\'ri email format'),
  password: z.string().min(1, 'Parolni kiriting'),
})

export type LoginFormData = z.infer<typeof loginSchema>

// Register validation schema
export const registerSchema = z.object({
  fullName: z.string().min(2, 'Ism kamida 2 ta belgidan iborat'),
  email: z.string().email('Noto\'g\'ri email format'),
  phone: z.string().optional(),
  password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Parollar mos kelmadi',
  path: ['confirmPassword'],
})

export type RegisterFormData = z.infer<typeof registerSchema>

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string().email('Noto\'g\'ri email format'),
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>