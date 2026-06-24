'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Search, Plus, Filter, Phone, Mail, Calendar, DollarSign, User, Pencil, Trash2 } from 'lucide-react'
import { Table } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { mockStaff } from '@/lib/mock/data'
import type { Staff, Status } from '@/lib/types'

const positions = [
  'Barcha lavozimlar', 'Direktor', "O'quv ishlari (Zavuch)", 'Matematika o\'qituvchisi',
  'Fizika o\'qituvchisi', 'Ingliz tili o\'qituvchisi', 'Ona tili o\'qituvchisi',
  'Tarix o\'qituvchisi', 'Kimyo o\'qituvchisi', 'Biologiya o\'qituvchisi',
  'Boshlang\'ich sinf o\'qituvchisi', 'IT o\'qituvchisi', 'Jismoniy tarbiya o\'qituvchisi',
  'Psixolog', 'Geografiya o\'qituvchisi'
]

const formatCurrency = (n: number) => new Intl.NumberFormat('uz-UZ').format(n)

const statusLabels: Record<Status, string> = {
  active: "Faol", inactive: "Faol emas", on_leave: "Ta'tilda"
}

export default function HrPage() {
  const [search, setSearch] = useState('')
  const [positionFilter, setPositionFilter] = useState('Barcha lavozimlar')
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const filtered = mockStaff.filter(s => {
    const matchSearch = s.full_name.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search) || s.position.toLowerCase().includes(search.toLowerCase())
    const matchPos = positionFilter === 'Barcha lavozimlar' || s.position === positionFilter
    return matchSearch && matchPos
  })

  const columns = [
    { key: 'full_name', title: 'Xodim', render: (s: Staff) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="avatar">{s.initials}</div>
        <div>
          <div style={{ fontWeight: 600, color: '#111827' }}>{s.full_name}</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>{s.position}</div>
        </div>
      </div>
    )},
    { key: 'phone', title: 'Telefon', render: (s: Staff) => (
      <span style={{ color: '#6b7280' }}>{s.phone}</span>
    )},
    { key: 'subject', title: 'Fan', render: (s: Staff) => s?.subject || <span style={{ color: '#d1d5db' }}>—</span> },
    { key: 'joined_year', title: "Ish boshlagan", render: (s: Staff) => (
      <span style={{ color: '#6b7280' }}>{s.joined_year}</span>
    )},
    { key: 'salary_base', title: 'Maosh (asos)', render: (s: Staff) => (
      <span style={{ fontWeight: 600 }}>{formatCurrency(s.salary_base)} so'm</span>
    )},
    { key: 'status', title: 'Holat', render: (s: Staff) => (
      <StatusBadge status={s.status} />
    )},
  ]

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>Hodimlar (HR)</h1>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Jami {filtered.length} ta xodim</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Yangi xodim
        </button>
      </div>

      {/* Search & Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: 10, color: '#9ca3af' }} />
          <input
            className="form-input"
            style={{ paddingLeft: 36, fontSize: 13.5 }}
            placeholder="Ism, telefon yoki lavozim bo'yicha qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="form-select"
          style={{ width: 220, fontSize: 13 }}
          value={positionFilter}
          onChange={e => setPositionFilter(e.target.value)}
        >
          {positions.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <button className="btn-outline" style={{ gap: 6 }}>
          <Filter size={14} />
          Filtr
        </button>
      </div>

      {/* Table */}
      <div className="card">
        <Table
          columns={columns}
          data={filtered}
          onRowClick={s => { setSelectedStaff(s); setShowModal(true) }}
          emptyMessage="Xodim topilmadi"
          rowKey="id"
        />
      </div>

      {/* Profile Modal */}
      <Modal isOpen={showModal} onClose={() => { setShowModal(false); setSelectedStaff(null) }} title="Xodim profili" size="lg">
        {selectedStaff && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(0,51,102,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: '#003366' }}>
                {selectedStaff.initials}
              </div>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>{selectedStaff.full_name}</h2>
                <p style={{ fontSize: 14, color: '#6b7280' }}>{selectedStaff.position}</p>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <StatusBadge status={selectedStaff.status} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Telefon</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f9fafb', borderRadius: 7, fontSize: 13.5 }}>
                  <Phone size={14} color="#6b7280" />{selectedStaff.phone}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Lavozim</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f9fafb', borderRadius: 7, fontSize: 13.5 }}>
                  <User size={14} color="#6b7280" />{selectedStaff.position}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Fan (ixtisoslik)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f9fafb', borderRadius: 7, fontSize: 13.5 }}>
                  <Mail size={14} color="#6b7280" />{selectedStaff.subject || "Yo'q"}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Ish boshlagan yil</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f9fafb', borderRadius: 7, fontSize: 13.5 }}>
                  <Calendar size={14} color="#6b7280" />{selectedStaff.joined_year}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Asosiy maosh</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#f9fafb', borderRadius: 7, fontSize: 13.5, fontWeight: 600 }}>
                  <DollarSign size={14} color="#6b7280" />{formatCurrency(selectedStaff.salary_base)} so'm
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
              <button className="btn-outline" style={{ gap: 6 }}>
                <Pencil size={14} />Tahrirlash
              </button>
              <button className="btn-outline" style={{ gap: 6, color: '#dc2626', borderColor: '#fecaca' }}>
                <Trash2 size={14} />O'chirish
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Staff Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Yangi xodim qo'shish">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="form-group">
            <label className="form-label">To'liq ism</label>
            <input className="form-input" placeholder="Ism familiya" />
          </div>
          <div className="form-group">
            <label className="form-label">Telefon</label>
            <input className="form-input" placeholder="+998 XX XXX XX XX" />
          </div>
          <div className="form-group">
            <label className="form-label">Lavozim</label>
            <select className="form-select">
              {positions.filter(p => p !== 'Barcha lavozimlar').map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Fan</label>
            <input className="form-input" placeholder="Ixtisoslik fani" />
          </div>
          <div className="form-group">
            <label className="form-label">Ish boshlagan yil</label>
            <input className="form-input" type="number" placeholder="2025" />
          </div>
          <div className="form-group">
            <label className="form-label">Asosiy maosh</label>
            <input className="form-input" type="number" placeholder="4 000 000" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="btn-outline" onClick={() => setShowAddModal(false)}>Bekor qilish</button>
          <button className="btn-primary">Saqlash</button>
        </div>
      </Modal>
    </div>
  )
}
