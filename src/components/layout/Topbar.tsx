'use client'

import { Bell, Search, ChevronDown } from 'lucide-react'
import { usePathname } from 'next/navigation'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Maktab statistikasi',
  '/dashboard/hr': 'Hodimlar (HR)',
  '/dashboard/salary': 'Ish haqi & davomati',
  '/dashboard/finance': 'Moliya moduli',
  '/dashboard/finance/expenses': 'Xarajatlar & hisobot',
  '/dashboard/docs': 'Hujjatlar boshqaruvi',
  '/dashboard/parents': 'Ota-onalar bilan aloqa',
  '/dashboard/reports': 'Davlat hisobotlari',
  '/dashboard/schedule': 'Dars jadvali',
  '/dashboard/workload': "O'qituvchi yuklamasi",
  '/dashboard/classes': 'Sinflar & guruhlar',
  '/dashboard/exams': 'Imtihon jadvali',
  '/dashboard/methodical': 'Metodik ishlar',
  '/dashboard/events': 'Tadbirlar rejasi',
  '/dashboard/discipline': 'Intizom holati',
  '/dashboard/psycho': 'Psixolog yozuvlari',
  '/dashboard/sport': "Sport & to'garaklar",
}

export default function Topbar() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || 'EduSphere Pro'

  return (
    <div className="topbar flex items-center justify-between px-6 gap-4">
      <h1 style={{ fontSize: 16, fontWeight: 600, color: '#111827' }}>{title}</h1>

      <div className="flex items-center gap-3">
        <button className="btn-outline" style={{ gap: 6, padding: '6px 12px', fontSize: 13 }}>
          <Search size={14} />
          Qidirish
        </button>

        <button className="btn-outline" style={{ gap: 6, padding: '6px 12px', fontSize: 13, position: 'relative' }}>
          <Bell size={14} />
          Bildirishnomalar
          <span style={{ width: 7, height: 7, background: '#dc2626', borderRadius: '50%', position: 'absolute', top: 6, right: 9 }} />
        </button>

        <button className="btn-gold" style={{ gap: 6, padding: '6px 14px', fontSize: 12 }}>
          2024–2025
          <ChevronDown size={13} />
        </button>
      </div>
    </div>
  )
}
