'use client'

import { usePathname } from 'next/navigation'
import { Bell, Calendar } from 'lucide-react'

const titles: Record<string, string> = {
  '/teacher': 'Dashboard',
  '/teacher/attendance': 'Davomat',
  '/teacher/grades': 'Baholash tizimi',
  '/teacher/schedule': 'Dars jadvali',
  '/teacher/materials': 'Dars materiallari',
  '/teacher/chat': 'Muloqot',
}

export default function TeacherTopbar() {
  const pathname = usePathname()
  const title = titles[pathname] || 'O\'qituvchi paneli'

  return (
    <div style={{
      height: 52, background: '#fff', borderBottom: '1px solid #e5e7eb',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', position: 'sticky', top: 0, zIndex: 40
    }}>
      <h1 style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: 13, color: '#6b7280', display: 'flex', alignItems: 'center', gap: 5 }}>
          <Calendar size={14} />
          Shanba, 22-iyun 2025
        </div>
        <button style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 7, padding: '5px 10px', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Bell size={15} color="#6b7280" />
          <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, background: '#dc2626', borderRadius: '50%' }} />
        </button>
      </div>
    </div>
  )
}
