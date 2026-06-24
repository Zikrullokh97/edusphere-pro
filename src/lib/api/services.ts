import api from './client'
import type {
  DashboardStats, Staff, SalaryRecord, Payment, Expense,
  SchoolClass, Lesson, TeacherWorkload, Exam, Document,
  ParentContact, SchoolEvent, DisciplineRecord,
  PsychoSession, SportSection, SportAchievement
} from '@/lib/types'

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const dashboardApi = {
  getStats: () => api.get<DashboardStats>('/api/dashboard/stats').then(r => r.data),
}

// ─── HR ───────────────────────────────────────────────────────────────────────
export const hrApi = {
  getAll:   (position?: string) => api.get<Staff[]>('/api/staff', { params: { position } }).then(r => r.data),
  getOne:   (id: string)        => api.get<Staff>(`/api/staff/${id}`).then(r => r.data),
  create:   (data: Partial<Staff>) => api.post<Staff>('/api/staff', data).then(r => r.data),
  update:   (id: string, data: Partial<Staff>) => api.put<Staff>(`/api/staff/${id}`, data).then(r => r.data),
  delete:   (id: string)        => api.delete(`/api/staff/${id}`),
}

// ─── Salary ───────────────────────────────────────────────────────────────────
export const salaryApi = {
  getMonth: (month: string) => api.get<SalaryRecord[]>('/api/salary', { params: { month } }).then(r => r.data),
  pay:      (id: string)    => api.post(`/api/salary/${id}/pay`).then(r => r.data),
  payAll:   (month: string) => api.post('/api/salary/pay-all', { month }).then(r => r.data),
  exportExcel: (month: string) => api.get('/api/salary/export', { params: { month }, responseType: 'blob' }).then(r => r.data),
}

// ─── Finance ──────────────────────────────────────────────────────────────────
export const financeApi = {
  getPayments:     (params?: Record<string, string>) => api.get<Payment[]>('/api/finance/payments', { params }).then(r => r.data),
  createPayment:   (data: Partial<Payment>)          => api.post<Payment>('/api/finance/payments', data).then(r => r.data),
  getExpenses:     ()                                => api.get<Expense[]>('/api/finance/expenses').then(r => r.data),
  createExpense:   (data: Partial<Expense>)          => api.post<Expense>('/api/finance/expenses', data).then(r => r.data),
  getReport:       (month: string)                   => api.get('/api/finance/report', { params: { month } }).then(r => r.data),
  exportPDF:       (month: string)                   => api.get('/api/finance/export/pdf', { params: { month }, responseType: 'blob' }).then(r => r.data),
  exportExcel:     (month: string)                   => api.get('/api/finance/export/excel', { params: { month }, responseType: 'blob' }).then(r => r.data),
}

// ─── Documents ────────────────────────────────────────────────────────────────
export const docsApi = {
  getAll:  () => api.get<Document[]>('/api/documents').then(r => r.data),
  create:  (data: Partial<Document>) => api.post<Document>('/api/documents', data).then(r => r.data),
  sign:    (id: string)              => api.post(`/api/documents/${id}/sign`).then(r => r.data),
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
export const scheduleApi = {
  getByClass: (class_id: string)      => api.get<Lesson[]>('/api/schedule', { params: { class_id } }).then(r => r.data),
  update:     (lessons: Lesson[])     => api.put('/api/schedule', { lessons }).then(r => r.data),
}

// ─── Workload ─────────────────────────────────────────────────────────────────
export const workloadApi = {
  getAll: () => api.get<TeacherWorkload[]>('/api/workload').then(r => r.data),
}

// ─── Classes ──────────────────────────────────────────────────────────────────
export const classesApi = {
  getAll:  () => api.get<SchoolClass[]>('/api/classes').then(r => r.data),
  getOne:  (id: string) => api.get<SchoolClass>(`/api/classes/${id}`).then(r => r.data),
  create:  (data: Partial<SchoolClass>) => api.post<SchoolClass>('/api/classes', data).then(r => r.data),
}

// ─── Exams ────────────────────────────────────────────────────────────────────
export const examsApi = {
  getAll:  () => api.get<Exam[]>('/api/exams').then(r => r.data),
  create:  (data: Partial<Exam>) => api.post<Exam>('/api/exams', data).then(r => r.data),
  update:  (id: string, data: Partial<Exam>) => api.put<Exam>(`/api/exams/${id}`, data).then(r => r.data),
}

// ─── Parents ──────────────────────────────────────────────────────────────────
export const parentsApi = {
  getAll:     () => api.get<ParentContact[]>('/api/parents').then(r => r.data),
  sendBulk:   (message: string) => api.post('/api/parents/bulk-message', { message }).then(r => r.data),
  sendMessage:(id: string, msg: string) => api.post(`/api/parents/${id}/message`, { message: msg }).then(r => r.data),
}

// ─── Reports ──────────────────────────────────────────────────────────────────
export const reportsApi = {
  attendance: (format: 'pdf' | 'excel', month: string) =>
    api.get(`/api/reports/attendance/${format}`, { params: { month }, responseType: 'blob' }).then(r => r.data),
  finance: (format: 'pdf' | 'excel', month: string) =>
    api.get(`/api/reports/finance/${format}`, { params: { month }, responseType: 'blob' }).then(r => r.data),
  staff: (format: 'pdf' | 'excel') =>
    api.get(`/api/reports/staff/${format}`, { responseType: 'blob' }).then(r => r.data),
}

// ─── Events ───────────────────────────────────────────────────────────────────
export const eventsApi = {
  getAll:  () => api.get<SchoolEvent[]>('/api/events').then(r => r.data),
  create:  (data: Partial<SchoolEvent>) => api.post<SchoolEvent>('/api/events', data).then(r => r.data),
}

// ─── Discipline ───────────────────────────────────────────────────────────────
export const disciplineApi = {
  getAll:  () => api.get<DisciplineRecord[]>('/api/discipline').then(r => r.data),
  create:  (data: Partial<DisciplineRecord>) => api.post<DisciplineRecord>('/api/discipline', data).then(r => r.data),
  resolve: (id: string) => api.patch(`/api/discipline/${id}`, { status: 'resolved' }).then(r => r.data),
}

// ─── Psycho ───────────────────────────────────────────────────────────────────
export const psychoApi = {
  getAll:  () => api.get<PsychoSession[]>('/api/psycho/sessions').then(r => r.data),
  create:  (data: Partial<PsychoSession>) => api.post<PsychoSession>('/api/psycho/sessions', data).then(r => r.data),
}

// ─── Sport ────────────────────────────────────────────────────────────────────
export const sportApi = {
  getSections:     () => api.get<SportSection[]>('/api/sport/sections').then(r => r.data),
  getAchievements: () => api.get<SportAchievement[]>('/api/sport/achievements').then(r => r.data),
}
