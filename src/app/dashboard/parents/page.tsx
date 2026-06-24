'use client'

import { useState } from 'react'
import { Search, Send, MessageCircle, Phone } from 'lucide-react'
import { Table } from '@/components/ui/Table'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { mockParents } from '@/lib/mock/data'
import type { ParentContact } from '@/lib/types'

const statusLabels: Record<string, string> = { replied: 'Javob berilgan', seen: "Ko'rilgan", no_reply: 'Javobsiz', pending: 'Kutilmoqda' }

export default function ParentsPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<ParentContact | null>(null)
  const [showMsg, setShowMsg] = useState(false)
  const [showSend, setShowSend] = useState(false)

  const filtered = mockParents.filter(p =>
    p.parent_name.toLowerCase().includes(search.toLowerCase()) ||
    p.child_name.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { key: 'parent_name', title: 'Ota-ona', render: (p: ParentContact) => (
      <div style={{ fontWeight: 600, color: '#111827' }}>{p.parent_name}</div>
    )},
    { key: 'child_name', title: "O'quvchi", render: (p: ParentContact) => (
      <div style={{ color: '#6b7280' }}>{p.child_name} <span style={{ fontSize: 12 }}>({p.class_name})</span></div>
    )},
    { key: 'class_name', title: 'Sinf' },
    { key: 'last_contact', title: "Oxirgi muloqot" },
    { key: 'status', title: 'Holat', render: (p: ParentContact) => (
      <StatusBadge status={p.status} />
    )},
    { key: 'actions', title: '', render: (p: ParentContact) => (
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="btn-outline" style={{ padding: '4px 8px', fontSize: 12 }} onClick={e => { e.stopPropagation(); setSelected(p); setShowMsg(true) }}>
          Xabar
        </button>
        <button className="btn-outline" style={{ padding: '4px 8px', fontSize: 12 }}>
          <Phone size={12} />
        </button>
      </div>
    )},
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>Ota-onalar bilan aloqa</h1>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Jami {filtered.length} ta ota-ona</p>
        </div>
        <button className="btn-primary" onClick={() => setShowSend(true)}>
          <Send size={16} />Barchaga xabar
        </button>
      </div>
      <div style={{ position: 'relative', maxWidth: 380, marginBottom: 16 }}>
        <Search size={15} style={{ position: 'absolute', left: 12, top: 10, color: '#9ca3af' }} />
        <input className="form-input" style={{ paddingLeft: 36 }} placeholder="Ota-ona yoki o'quvchi ismi..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="card">
        <Table columns={columns} data={filtered} onRowClick={p => { setSelected(p); setShowMsg(true) }} emptyMessage="Ota-ona topilmadi" rowKey="id" />
      </div>

      <Modal isOpen={showMsg && !!selected} onClose={() => { setShowMsg(false); setSelected(null) }} title="Xabar yuborish">
        {selected && (
          <div>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>
              <strong>{selected.parent_name}</strong> ga ({selected.child_name})
            </p>
            <div className="form-group">
              <label className="form-label">Xabar matni</label>
              <textarea className="form-input" style={{ minHeight: 120, resize: 'vertical' }} placeholder="Xabar yozing..." />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-primary"><Send size={14} />Yuborish</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={showSend} onClose={() => setShowSend(false)} title="Barcha ota-onalarga xabar">
        <div className="form-group">
          <label className="form-label">Xabar matni</label>
          <textarea className="form-input" style={{ minHeight: 140, resize: 'vertical' }} placeholder="Barcha ota-onalarga xabar..." />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary"><Send size={14} />Yuborish</button>
        </div>
      </Modal>
    </div>
  )
}
