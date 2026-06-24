import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  dashboardApi, hrApi, salaryApi, financeApi, docsApi,
  scheduleApi, workloadApi, classesApi, examsApi, parentsApi,
  eventsApi, disciplineApi, psychoApi, sportApi
} from '@/lib/api/services'
import toast from 'react-hot-toast'

// ─── Dashboard ────────────────────────────────────────────────────────────────
export const useDashboardStats = () =>
  useQuery({ queryKey: ['dashboard-stats'], queryFn: dashboardApi.getStats })

// ─── HR ───────────────────────────────────────────────────────────────────────
export const useStaff = (position?: string) =>
  useQuery({ queryKey: ['staff', position], queryFn: () => hrApi.getAll(position) })

export const useCreateStaff = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: hrApi.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['staff'] }); toast.success("Xodim qo'shildi") },
    onError: () => toast.error("Xato yuz berdi")
  })
}

export const useUpdateStaff = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof hrApi.update>[1] }) => hrApi.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['staff'] }); toast.success("Yangilandi") },
  })
}

// ─── Salary ───────────────────────────────────────────────────────────────────
export const useSalary = (month: string) =>
  useQuery({ queryKey: ['salary', month], queryFn: () => salaryApi.getMonth(month) })

export const usePaySalary = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: salaryApi.pay,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['salary'] }); toast.success("To'lov amalga oshirildi") },
  })
}

// ─── Finance ──────────────────────────────────────────────────────────────────
export const usePayments = (params?: Record<string, string>) =>
  useQuery({ queryKey: ['payments', params], queryFn: () => financeApi.getPayments(params) })

export const useExpenses = () =>
  useQuery({ queryKey: ['expenses'], queryFn: financeApi.getExpenses })

export const useCreatePayment = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: financeApi.createPayment,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['payments'] }); toast.success("To'lov qo'shildi") },
  })
}

// ─── Schedule ─────────────────────────────────────────────────────────────────
export const useSchedule = (class_id: string) =>
  useQuery({ queryKey: ['schedule', class_id], queryFn: () => scheduleApi.getByClass(class_id) })

export const useSaveSchedule = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: scheduleApi.update,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['schedule'] }); toast.success("Jadval saqlandi") },
  })
}

// ─── Workload ─────────────────────────────────────────────────────────────────
export const useWorkload = () =>
  useQuery({ queryKey: ['workload'], queryFn: workloadApi.getAll })

// ─── Classes ──────────────────────────────────────────────────────────────────
export const useClasses = () =>
  useQuery({ queryKey: ['classes'], queryFn: classesApi.getAll })

// ─── Exams ────────────────────────────────────────────────────────────────────
export const useExams = () =>
  useQuery({ queryKey: ['exams'], queryFn: examsApi.getAll })

export const useCreateExam = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: examsApi.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['exams'] }); toast.success("Imtihon qo'shildi") },
  })
}

// ─── Documents ────────────────────────────────────────────────────────────────
export const useDocuments = () =>
  useQuery({ queryKey: ['documents'], queryFn: docsApi.getAll })

export const useSignDocument = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: docsApi.sign,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['documents'] }); toast.success("Hujjat imzolandi") },
  })
}

// ─── Parents ──────────────────────────────────────────────────────────────────
export const useParents = () =>
  useQuery({ queryKey: ['parents'], queryFn: parentsApi.getAll })

// ─── Events ───────────────────────────────────────────────────────────────────
export const useEvents = () =>
  useQuery({ queryKey: ['events'], queryFn: eventsApi.getAll })

export const useCreateEvent = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: eventsApi.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['events'] }); toast.success("Tadbir qo'shildi") },
  })
}

// ─── Discipline ───────────────────────────────────────────────────────────────
export const useDiscipline = () =>
  useQuery({ queryKey: ['discipline'], queryFn: disciplineApi.getAll })

export const useCreateDiscipline = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: disciplineApi.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['discipline'] }); toast.success("Hodisa qayd etildi") },
  })
}

// ─── Psycho ───────────────────────────────────────────────────────────────────
export const usePsychoSessions = () =>
  useQuery({ queryKey: ['psycho'], queryFn: psychoApi.getAll })

// ─── Sport ────────────────────────────────────────────────────────────────────
export const useSportSections = () =>
  useQuery({ queryKey: ['sport-sections'], queryFn: sportApi.getSections })

export const useSportAchievements = () =>
  useQuery({ queryKey: ['sport-achievements'], queryFn: sportApi.getAchievements })
