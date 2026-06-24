'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Table } from '@/components/ui/Table'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { mockExams } from '@/lib/mock/data'
import type { Exam } from '@/lib/types'

const statusLabels: Record<string, string> = { scheduled: 'Rejalashtirilgan', done: "O'tkazilgan", cancelled: 'Bekor qilingan' }

export default function ExamsPage() {
  const [showAdd, setShowAdd] = useState(false)

  const columns = [
    { key: 'date', title: 'Sana' },
    { key: 'subject', title: 'Fan', render: (e: Exam) => <span style={{ fontWeight: 600 }}>{e.subject}</span> },
    { key: 'classes', title: 'Sinflar', render: (e: Exam) => e?.classes?.join(', ') ?? '-' },
    { key: 'teacher', title: "O'qituvchi" },
    { key: 'room', title: 'Xona', render: (e: Exam) => <span>{e.room}</span> },
    { key: 'duration_min', title: "Davomiylik", render: (e: Exam) => <span>{e.duration_min} daq</span> },
    { key: 'status', title: 'Holat', render: (e: Exam) => <StatusBadge status={e.status} /> },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>Imtihon jadvali</h1>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Jami {mockExams.length} ta imtihon</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>
          <Plus size={16} />Yangi imtihon
        </button>
      </div>

      <div className="card">
        <Table columns={columns} data={mockExams} emptyMessage="Imtihonlar mavjud emas" rowKey="id" />
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Yangi imtihon qo'shish">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="form-group">
            <label className="form-label">Fan</label>
            <input className="form-input" placeholder="Matematika" />
          </div>
          <div className="form-group">
            <label className="form-label">Sana</label>
            <input className="form-input" type="date" />
          </div>
          <div className="form-group">
            <label className="form-label">O'qituvchi</label>
            <input className="form-input" placeholder="Ism familiya" />
          </div>
          <div className="form-group">
            <label className="form-label">Xona</label>
            <input className="form-input" placeholder="205" />
          </div>
          <div className="form-group">
            <label className="form-label">Davomiylik (daq)</label>
            <input className="form-input" type="number" placeholder="90" />
          </div>
          <div className="form-group">
            <label className="form-label">Sinflar</label>
            <input className="form-input" placeholder="5A, 5B" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="btn-outline" onClick={() => setShowAdd(false)}>Bekor qilish</button>
          <button className="btn-primary">Saqlash</button>
        </div>
      </Modal>
    </div>
  )
}
