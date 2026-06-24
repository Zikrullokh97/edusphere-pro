'use client'

import { Table } from '@/components/ui/Table'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { mockWorkload } from '@/lib/mock/data'
import type { TeacherWorkload } from '@/lib/types'

const statusLabels: Record<string, string> = { normal: "Me'yorida", heavy: "Ko'p", overloaded: "Haddan ziyod" }

export default function WorkloadPage() {
  const columns = [
    { key: 'name', title: "O'qituvchi", render: (w: TeacherWorkload) => (
      <div style={{ fontWeight: 600, color: '#111827' }}>{w.name}</div>
    )},
    { key: 'subject', title: 'Fan' },
    { key: 'weekly_hours', title: 'Haftalik soat', render: (w: TeacherWorkload) => (
      <span style={{ fontWeight: 600 }}>{w.weekly_hours} / {w.max_hours}</span>
    )},
    { key: 'status', title: 'Holat', render: (w: TeacherWorkload) => (
      <StatusBadge status={w.status} />
    )},
  ]

  const totalHours = mockWorkload.reduce((s, w) => s + w.weekly_hours, 0)

  return (
    <div>
      <h1 className="text-2xl font-bold" style={{ color: '#111827', marginBottom: 4 }}>O'qituvchi yuklamasi</h1>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 20 }}>Jami {mockWorkload.length} ta o'qituvchi, {totalHours} soat</p>
      <div className="card">
        <Table columns={columns} data={mockWorkload} emptyMessage="Ma'lumot topilmadi" rowKey="id" />
      </div>
    </div>
  )
}
