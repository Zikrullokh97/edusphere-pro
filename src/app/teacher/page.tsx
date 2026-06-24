'use client'

import Link from 'next/link'
import {
  ClipboardCheck, BarChart2, CalendarDays,
  BookOpen, MessageSquare, TrendingUp, Users, Star, Clock
} from 'lucide-react'

const modules = [
  {
    href: '/teacher/attendance',
    icon: ClipboardCheck,
    color: '#003366',
    bg: 'rgba(0,51,102,0.08)',
    title: 'Davomat',
    desc: 'Face ID • Qo\'lda • SMS',
    stat: '94%', statLabel: 'bugungi davomad'
  },
  {
    href: '/teacher/grades',
    icon: BarChart2,
    color: '#C9A227',
    bg: 'rgba(201,162,39,0.1)',
    title: 'Baholash tizimi',
    desc: 'AI ovoz • Reyting • KPI',
    stat: '4.7', statLabel: 'o\'rtacha ball'
  },
  {
    href: '/teacher/schedule',
    icon: CalendarDays,
    color: '#0f766e',
    bg: 'rgba(15,118,110,0.08)',
    title: 'Dars jadvali',
    desc: 'Bugungi darslar • Mavzu • Vazifa',
    stat: '5', statLabel: 'bugun dars'
  },
  {
    href: '/teacher/materials',
    icon: BookOpen,
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    title: 'Dars materiallari',
    desc: 'PDF • AI test • Online dars',
    stat: '24', statLabel: 'fayl yuklangan'
  },
  {
    href: '/teacher/chat',
    icon: MessageSquare,
    color: '#dc2626',
    bg: 'rgba(220,38,38,0.07)',
    title: 'Muloqot',
    desc: 'Ota-ona • Kollektiv xabar',
    stat: '3', statLabel: 'yangi xabar'
  },
]

const todayLessons = [
  { time: '08:00', class: '5B', subject: 'Matematika', topic: 'Kasrlarni ko\'paytirish', room: '205' },
  { time: '09:00', class: '7A', subject: 'Matematika', topic: 'Tenglamalar', room: '205' },
  { time: '10:00', class: '9C', subject: 'Matematika', topic: 'Trigonometriya', room: '301' },
  { time: '11:00', class: '5A', subject: 'Matematika', topic: 'Kasrlarni bo\'lish', room: '205' },
  { time: '13:00', class: '8B', subject: 'Matematika', topic: 'Funksiyalar', room: '205' },
]

export default function TeacherDashboard() {
  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#111827', marginBottom: 4 }}>
              Xush kelibsiz, Sherzod aka 👋
            </h2>
            <p style={{ fontSize: 14, color: '#6b7280' }}>
              Shanba, 22-iyun 2025 · Matematika o'qituvchisi
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="stat-card" style={{ minWidth: 110, textAlign: 'center' }}>
              <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Users size={13} />O'quvchilar
              </div>
              <div className="stat-value">142</div>
            </div>
            <div className="stat-card" style={{ minWidth: 110, textAlign: 'center' }}>
              <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Star size={13} />KPI ball
              </div>
              <div className="stat-value" style={{ color: '#C9A227' }}>4.8</div>
            </div>
            <div className="stat-card" style={{ minWidth: 110, textAlign: 'center' }}>
              <div className="stat-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <TrendingUp size={13} />Haftalik soat
              </div>
              <div className="stat-value">27</div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
        {modules.map(m => {
          const Icon = m.icon
          return (
            <Link key={m.href} href={m.href} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ padding: 16, cursor: 'pointer', transition: 'all 0.15s', border: '1px solid #e5e7eb' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = m.color)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#e5e7eb')}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Icon size={20} color={m.color} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 3 }}>{m.title}</div>
                <div style={{ fontSize: 11.5, color: '#9ca3af', marginBottom: 10 }}>{m.desc}</div>
                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 8, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: m.color }}>{m.stat}</span>
                  <span style={{ fontSize: 11, color: '#9ca3af' }}>{m.statLabel}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Today lessons */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Clock size={16} color="#C9A227" />
            Bugungi darslar
          </div>
          <Link href="/teacher/schedule" style={{ fontSize: 13, color: '#003366', textDecoration: 'none', fontWeight: 500 }}>
            Barchasi →
          </Link>
        </div>
        <div style={{ padding: '0 4px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Vaqt</th>
                <th>Sinf</th>
                <th>Fan</th>
                <th>Mavzu</th>
                <th>Xona</th>
                <th>Holat</th>
              </tr>
            </thead>
            <tbody>
              {todayLessons.map((l, i) => (
                <tr key={i}>
                  <td><span style={{ fontWeight: 600, color: '#003366' }}>{l.time}</span></td>
                  <td><span className="badge badge-navy">{l.class}</span></td>
                  <td style={{ fontWeight: 500 }}>{l.subject}</td>
                  <td style={{ color: '#6b7280' }}>{l.topic}</td>
                  <td>{l.room}-xona</td>
                  <td>
                    <span className={`badge ${i === 0 ? 'badge-green' : i === 1 ? 'badge-blue' : 'badge-gray'}`}>
                      {i === 0 ? 'Yakunlandi' : i === 1 ? 'Jarayonda' : 'Kutilmoqda'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
