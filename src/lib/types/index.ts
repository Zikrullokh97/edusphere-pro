// ─── Shared ───────────────────────────────────────────────────────────────────
export type Status = 'active' | 'inactive' | 'on_leave'
export type PaymentStatus = 'paid' | 'pending' | 'overdue'
export type Gender = 'male' | 'female'

// ─── Auth ─────────────────────────────────────────────────────────────────────
export interface User {
  id: string
  name: string
  role: 'director' | 'deputy' | 'teacher' | 'parent' | 'student' | 'psychologist' | 'doctor' | 'technician'
  avatar?: string
  school_id: string
}

// ─── Staff (HR) ───────────────────────────────────────────────────────────────
export interface Staff {
  id: string
  full_name: string
  initials: string
  position: string
  subject?: string
  phone: string
  joined_year: number
  status: Status
  salary_base: number
}

export interface SalaryRecord {
  id: string
  staff_id: string
  staff_name: string
  position: string
  work_days: number
  total_days: number
  lesson_hours?: number
  base_salary: number
  bonus: number
  total: number
  status: PaymentStatus
  month: string
}

// ─── Finance ──────────────────────────────────────────────────────────────────
export interface Payment {
  id: string
  student_name: string
  class_name: string
  type: string
  amount: number
  status: PaymentStatus
  date: string
}

export interface Expense {
  id: string
  category: string
  amount: number
  date: string
  note?: string
}

// ─── Academic ─────────────────────────────────────────────────────────────────
export interface SchoolClass {
  id: string
  name: string
  room: string
  class_teacher: string
  student_count: number
  boys: number
  girls: number
  attendance_rate: number
}

export interface Lesson {
  id: string
  subject: string
  teacher: string
  teacher_short: string
  class_id: string
  day: 0 | 1 | 2 | 3 | 4   // Mon–Fri
  period: number             // 1–7
}

export interface TeacherWorkload {
  id: string
  name: string
  subject: string
  weekly_hours: number
  max_hours: number
  status: 'normal' | 'heavy' | 'overloaded'
}

export interface Exam {
  id: string
  date: string
  classes: string[]
  subject: string
  teacher: string
  room: string
  duration_min: number
  status: 'scheduled' | 'done' | 'cancelled'
}

// ─── Documents ────────────────────────────────────────────────────────────────
export interface Document {
  id: string
  number: number
  title: string
  date: string
  signed: boolean
  signed_by?: string
}

// ─── Parents ──────────────────────────────────────────────────────────────────
export interface ParentContact {
  id: string
  parent_name: string
  child_name: string
  class_name: string
  last_contact: string
  status: 'replied' | 'seen' | 'no_reply' | 'pending'
}

// ─── Tarbiyaviy ───────────────────────────────────────────────────────────────
export interface SchoolEvent {
  id: string
  title: string
  date: string
  day: number
  month: string
  time: string
  location: string
  responsible: string
  grades?: string
  status: 'upcoming' | 'today' | 'preparing' | 'done'
}

export interface DisciplineRecord {
  id: string
  student_name: string
  class_name: string
  incident: string
  date: string
  action: string
  status: 'resolved' | 'in_progress' | 'new'
}

export interface PsychoSession {
  id: string
  student_name: string
  class_name: string
  session_date: string
  psychologist: string
  result: 'improving' | 'monitoring' | 'adapting' | 'done'
  next_session?: string
}

export interface SportSection {
  id: string
  name: string
  schedule: string
  responsible: string
  student_count: number
}

export interface SportAchievement {
  id: string
  title: string
  date: string
  place: '1' | '2' | '3' | 'participant'
}

// ─── Stats ────────────────────────────────────────────────────────────────────
export interface DashboardStats {
  total_students: number
  total_teachers: number
  monthly_income: number
  attendance_rate: number
  weekly_attendance: { day: string; rate: number }[]
  recent_activities: {
    id: string
    user: string
    initials: string
    role: string
    action: string
    time: string
    status: string
  }[]
  notifications: {
    id: string
    message: string
    time: string
    type: 'info' | 'warning' | 'error'
  }[]
}
