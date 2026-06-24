'use client'

import { useState } from 'react'
import { CalendarDays, Clock, Plus, BookOpen, ClipboardList, CheckCircle2 } from 'lucide-react'

const schedule = [
  { id: 1, time: '08:00–08:45', class: '5B', room: '205', topic: 'Kasrlarni ko\'paytirish', hw: 'Darslik 87-bet, 3-5 mashqlar', saved: true },
  { id: 2, time: '09:00–09:45', class: '7A', room: '205', topic: 'Tenglamalar sistemi', hw: '', saved: false },
  { id: 3, time: '10:00–10:45', class: '9C', room: '301', topic: 'Trigonometriya: sin, cos', hw: 'Test: variant 12', saved: true },
  { id: 4, time: '11:00–11:45', class: '5A', room: '205', topic: '', hw: '', saved: false },
  { id: 5, time: '13:00–13:45', class: '8B', room: '205', topic: 'Funksiyalar va grafik', hw: '', saved: false },
]

type Lesson = typeof schedule[0]

export default function SchedulePage() {
  const [lessons, setLessons] = useState(schedule)
  const [editing, setEditing] = useState<number | null>(null)
  const [form, setForm] = useState({ topic: '', hw: '' })

  const startEdit = (l: Lesson) => {
    setEditing(l.id)
    setForm({ topic: l.topic, hw: l.hw })
  }

  const save = (id: number) => {
    setLessons(prev => prev.map(l => l.id === id ? { ...l, ...form, saved: !!(form.topic) } : l))
    setEditing(null)
  }

  const weekDays = [
    { day: 'Dushanba', date: '23-iyun', lessons: 5 },
    { day: 'Seshanba',  date: '24-iyun', lessons: 4 },
    { day: 'Chorshanba', date: '25-iyun', lessons: 5 },
    { day: 'Payshanba', date: '26-iyun', lessons: 3 },
    { day: 'Juma',     date: '27-iyun', lessons: 4 },
  ]

  return (
    <div>
      {/* Week strip */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
        {weekDays.map((d, i) => (
          <div key={d.day} style={{
            flex: 1, padding: '10px 12px', borderRadius: 9, border: '1px solid',
            borderColor: i === 0 ? '#003366' : '#e5e7eb',
            background: i === 0 ? '#003366' : '#fff',
            textAlign: 'center', cursor: 'pointer', transition: 'all 0.15s'
          }}>
            <div style={{ fontSize: 12, color: i === 0 ? 'rgba(255,255,255,0.6)' : '#9ca3af', marginBottom: 2 }}>{d.day}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: i === 0 ? '#fff' : '#111827' }}>{d.date}</div>
            <div style={{ fontSize: 11, color: i === 0 ? '#C9A227' : '#9ca3af', marginTop: 2 }}>{d.lessons} dars</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
        <CalendarDays size={15} color="#C9A227" />
        Dushanba, 23-iyun — bugungi darslar
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {lessons.map((l, i) => (
          <div key={l.id} className="card" style={{ borderLeft: `3px solid ${i <= 1 ? '#003366' : '#e5e7eb'}` }}>
            <div style={{ padding: '14px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: editing === l.id ? 14 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ textAlign: 'center', minWidth: 64 }}>
                    <div style={{ fontSize: 12, color: '#9ca3af' }}>
                      <Clock size={11} style={{ display: 'inline', marginRight: 3 }} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#003366' }}>{l.time}</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ background: 'rgba(0,51,102,0.1)', color: '#003366', fontWeight: 700, fontSize: 13, padding: '2px 10px', borderRadius: 20 }}>{l.class}</span>
                      <span style={{ fontSize: 13, color: '#6b7280' }}>{l.room}-xona</span>
                    </div>
                    {!editing || editing !== l.id ? (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                          <BookOpen size={13} color="#9ca3af" />
                          <span style={{ fontSize: 13.5, color: l.topic ? '#111827' : '#d1d5db', fontStyle: l.topic ? 'normal' : 'italic' }}>
                            {l.topic || 'Mavzu kiritilmagan'}
                          </span>
                        </div>
                        {l.hw && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <ClipboardList size={13} color="#9ca3af" />
                            <span style={{ fontSize: 12.5, color: '#6b7280' }}>{l.hw}</span>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {l.saved && <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#15803d' }}><CheckCircle2 size={13} />Saqlangan</span>}
                  {editing !== l.id ? (
                    <button onClick={() => startEdit(l)} className="btn-outline" style={{ padding: '5px 12px', fontSize: 12 }}>
                      {l.topic ? 'Tahrirlash' : 'Mavzu kiriting'}
                    </button>
                  ) : (
                    <button onClick={() => save(l.id)} className="btn-primary" style={{ padding: '5px 12px', fontSize: 12 }}>
                      Saqlash
                    </button>
                  )}
                </div>
              </div>

              {/* Edit form */}
              {editing === l.id && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Dars mavzusi</label>
                    <input className="form-input" placeholder="Masalan: Kasrlarni ko'paytirish" value={form.topic}
                      onChange={e => setForm(p => ({ ...p, topic: e.target.value }))} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Uy vazifasi</label>
                    <input className="form-input" placeholder="Masalan: Darslik 87-bet, 3-5 mashqlar" value={form.hw}
                      onChange={e => setForm(p => ({ ...p, hw: e.target.value }))} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add lesson */}
        <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, padding: '12px', borderRadius: 9, borderStyle: 'dashed', fontSize: 13, color: '#9ca3af' }}>
          <Plus size={16} />Qo'shimcha dars qo'shish
        </button>
      </div>
    </div>
  )
}
