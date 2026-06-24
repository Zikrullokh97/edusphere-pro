'use client'

import { useState } from 'react'
import { Plus, MapPin, Clock, Calendar } from 'lucide-react'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { mockEvents } from '@/lib/mock/data'
import type { SchoolEvent } from '@/lib/types'

const statusLabels: Record<string, string> = { upcoming: 'Kutilmoqda', today: 'Bugun', preparing: 'Tayyorlanmoqda', done: "O'tkazilgan" }
const monthColors: Record<string, string> = { Iyun: '#003366', Sentabr: '#C9A227', Oktabr: '#0f766e' }

export default function EventsPage() {
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>Tadbirlar rejasi</h1>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Jami {mockEvents.length} ta tadbir</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>
          <Plus size={16} />Yangi tadbir
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {mockEvents.map(e => (
          <div className="card" key={e.id} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex' }}>
              <div style={{
                width: 64, minHeight: 100, background: monthColors[e.month] || '#6b7280',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                color: 'white', padding: 8
              }}>
                <span style={{ fontSize: 11, opacity: 0.8 }}>{e.month}</span>
                <span style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{e.day}</span>
              </div>
              <div style={{ flex: 1, padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 14, color: '#111827' }}>{e.title}</h3>
                  <StatusBadge status={e.status} />
                </div>
                <div style={{ fontSize: 12.5, color: '#6b7280', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={13} />{e.time}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={13} />{e.location}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={13} />{e.grades || 'Barcha sinflar'}</span>
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>Mas'ul: {e.responsible}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Yangi tadbir qo'shish">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="form-group">
            <label className="form-label">Nomi</label>
            <input className="form-input" placeholder="Tadbir nomi" />
          </div>
          <div className="form-group">
            <label className="form-label">Sana</label>
            <input className="form-input" type="date" />
          </div>
          <div className="form-group">
            <label className="form-label">Vaqt</label>
            <input className="form-input" placeholder="14:00" />
          </div>
          <div className="form-group">
            <label className="form-label">Joy</label>
            <input className="form-input" placeholder="Akt zal" />
          </div>
          <div className="form-group">
            <label className="form-label">Mas'ul</label>
            <input className="form-input" placeholder="Ism familiya" />
          </div>
          <div className="form-group">
            <label className="form-label">Sinflar</label>
            <input className="form-input" placeholder="5-11" />
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
