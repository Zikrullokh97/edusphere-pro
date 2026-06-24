'use client'

import { useState } from 'react'
import { Search, Download, ChevronDown, DollarSign, CheckCircle, Clock, AlertCircle, Printer, FileSpreadsheet } from 'lucide-react'
import { Table } from '@/components/ui/Table'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { mockSalary, mockStaff } from '@/lib/mock/data'
import type { SalaryRecord } from '@/lib/types'

const months = ['2025-06', '2025-05', '2025-04', '2025-03', '2025-02', '2025-01']

const formatCurrency = (n: number) => new Intl.NumberFormat('uz-UZ').format(n)

const statusLabels: Record<string, string> = { paid: "To'langan", pending: "Kutilmoqda", overdue: "Muddati o'tgan" }

export default function SalaryPage() {
  const [month, setMonth] = useState('2025-06')
  const [search, setSearch] = useState('')

  const data = mockSalary.filter(s => s.month === month).filter(s =>
    s.staff_name.toLowerCase().includes(search.toLowerCase())
  )

  const total = data.reduce((sum, s) => sum + s.total, 0)
  const paidTotal = data.filter(s => s.status === 'paid').reduce((sum, s) => sum + s.total, 0)
  const pendingTotal = data.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.total, 0)

  const columns = [
    { key: 'staff_name', title: 'Xodim', render: (s: SalaryRecord) => (
      <div>
        <div style={{ fontWeight: 600, color: '#111827' }}>{s.staff_name}</div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>{s.position}</div>
      </div>
    )},
    { key: 'work_days', title: 'Ish kuni', render: (s: SalaryRecord) => (
      <span>{s.work_days}/{s.total_days}</span>
    )},
    { key: 'lesson_hours', title: 'Dars soati', render: (s: SalaryRecord) => (
      <span>{s?.lesson_hours || <span style={{ color: '#d1d5db' }}>—</span>}</span>
    )},
    { key: 'base_salary', title: 'Asosiy', render: (s: SalaryRecord) => (
      <span>{formatCurrency(s.base_salary)}</span>
    )},
    { key: 'bonus', title: 'Bonus', render: (s: SalaryRecord) => (
      <span style={{ color: '#15803d' }}>+{formatCurrency(s.bonus)}</span>
    )},
    { key: 'total', title: 'Jami', render: (s: SalaryRecord) => (
      <span style={{ fontWeight: 700, fontSize: 14 }}>{formatCurrency(s.total)} so'm</span>
    )},
    { key: 'status', title: 'Holat', render: (s: SalaryRecord) => (
      <StatusBadge status={s.status} />
    )},
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>Ish haqi & davomati</h1>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>{month.replace('-', ' - ')} oyi uchun hisobot</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <select className="form-select" style={{ width: 160 }} value={month} onChange={e => setMonth(e.target.value)}>
            {months.map(m => <option key={m} value={m}>{m.replace('-', ' - ')}</option>)}
          </select>
          <button className="btn-outline" style={{ gap: 6 }}>
            <Printer size={14} />PDF
          </button>
          <button className="btn-outline" style={{ gap: 6 }}>
            <FileSpreadsheet size={14} />Excel
          </button>
          <button className="btn-gold" style={{ gap: 6 }}>
            <DollarSign size={14} />Barchasini to'lash
          </button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <div className="stat-card">
          <div className="stat-label">Jami xodimlar</div>
          <div className="stat-value">{data.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Umumiy ish haqi</div>
          <div className="stat-value" style={{ color: '#003366' }}>{formatCurrency(total)} so'm</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">To'langan</div>
          <div className="stat-value" style={{ color: '#15803d' }}>{formatCurrency(paidTotal)} so'm</div>
          <div className="stat-sub">{data.filter(s => s.status === 'paid').length} ta xodim</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">To'lanmagan</div>
          <div className="stat-value" style={{ color: '#b91c1c' }}>{formatCurrency(pendingTotal)} so'm</div>
          <div className="stat-sub">{data.filter(s => s.status === 'pending').length} ta xodim</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ position: 'relative', maxWidth: 380 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: 10, color: '#9ca3af' }} />
          <input className="form-input" style={{ paddingLeft: 36 }} placeholder="Xodim nomi bilan qidirish..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <Table columns={columns} data={data} emptyMessage="Ma'lumot topilmadi" rowKey="id" />
      </div>
    </div>
  )
}
