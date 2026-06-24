'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { mockLessons, mockClasses } from '@/lib/mock/data'
import { Modal } from '@/components/ui/Modal'

const days = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma']
const periods = ['1', '2', '3', '4', '5', '6', '7']
const colors = ['#003366', '#C9A227', '#0f766e', '#7c3aed', '#dc2626', '#0891b2', '#65a30d']

export default function SchedulePage() {
  const [selectedClass, setSelectedClass] = useState('5A')
  const [showLesson, setShowLesson] = useState(false)

  const classLessons = mockLessons.filter(l => l.class_id === selectedClass)

  const getLessonColor = (subject: string) => {
    const idx = classLessons.findIndex(l => l.subject === subject)
    return colors[idx % colors.length]
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>Dars jadvali</h1>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Haftalik dars jadvali va o'zgartirishlar</p>
        </div>
        <select className="form-select" style={{ width: 140 }} value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
          {mockClasses.map(c => <option key={c.id} value={c.id}>{c.name}-sinf</option>)}
        </select>
      </div>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div className="sched-grid">
          <div className="sched-cell sched-head">Vaqt</div>
          {days.map(d => <div key={d} className="sched-cell sched-head">{d}</div>)}

          {periods.map((p, pi) => (
            <>
              <div key={`p-${pi}`} className="sched-cell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#6b7280', background: '#fafafa' }}>
                {p}-dars<br /><span style={{ fontSize: 10, fontWeight: 400 }}>{8 + pi}:00</span>
              </div>
              {days.map((_, di) => {
                const lesson = classLessons.find(l => l.day === di && l.period === pi + 1)
                const color = lesson ? getLessonColor(lesson.subject) : '#e5e7eb'
                return (
                  <div key={`c-${di}-${pi}`} className="sched-cell" style={{ cursor: lesson ? 'pointer' : 'default' }}
                    onClick={() => lesson && setShowLesson(true)}>
                    {lesson ? (
                      <div className="sched-lesson" style={{ background: `${color}15`, borderLeft: `3px solid ${color}` }}>
                        <strong>{lesson.subject}</strong>
                        <span>{lesson.teacher_short}</span>
                      </div>
                    ) : null}
                  </div>
                )
              })}
            </>
          ))}
        </div>
      </div>

      <Modal isOpen={showLesson} onClose={() => setShowLesson(false)} title="Dars haqida">
        <div className="form-group">
          <label className="form-label">Fan</label>
          <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 7 }}>Matematika</div>
        </div>
        <div className="form-group">
          <label className="form-label">O'qituvchi</label>
          <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 7 }}>Sherzod Aliyev</div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
          <button className="btn-outline">Tahrirlash</button>
          <button className="btn-primary">Yopish</button>
        </div>
      </Modal>
    </div>
  )
}
