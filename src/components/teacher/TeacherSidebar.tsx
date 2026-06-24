'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, ClipboardCheck, BarChart2,
  CalendarDays, BookOpen, MessageSquare, LogOut, Mic
} from 'lucide-react'
import clsx from 'clsx'

const nav = [
  { href: '/teacher', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/teacher/attendance', label: 'Davomat', icon: ClipboardCheck },
  { href: '/teacher/grades', label: 'Baholash tizimi', icon: BarChart2, badge: 'AI' },
  { href: '/teacher/schedule', label: 'Dars jadvali', icon: CalendarDays },
  { href: '/teacher/materials', label: 'Dars materiallari', icon: BookOpen },
  { href: '/teacher/chat', label: 'Muloqot', icon: MessageSquare, badge: '3' },
]

export default function TeacherSidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      width: 220, background: '#003366', height: '100vh', position: 'fixed',
      left: 0, top: 0, display: 'flex', flexDirection: 'column', zIndex: 50
    }}>
      {/* Logo */}
      <div style={{ padding: '18px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, background: '#C9A227', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, color: '#003366', flexShrink: 0 }}>E</div>
        <div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>EduSphere Pro</div>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10 }}>O'qituvchi paneli</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 0', overflowY: 'auto' }}>
        {nav.map(item => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/teacher' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href}
              className={clsx('nav-item', isActive && 'active')}
              style={{ justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <Icon size={16} />
                {item.label}
              </span>
              {item.badge && (
                <span style={{
                  background: item.badge === 'AI' ? 'rgba(201,162,39,0.25)' : '#dc2626',
                  color: item.badge === 'AI' ? '#e8b82e' : '#fff',
                  fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 10,
                  flexShrink: 0
                }}>{item.badge}</span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* AI Voice hint */}
      <div style={{ margin: '0 10px 10px', background: 'rgba(201,162,39,0.12)', borderRadius: 8, padding: '10px 12px', border: '1px solid rgba(201,162,39,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
          <Mic size={13} color="#C9A227" />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: '#C9A227' }}>AI Ovoz baholash</span>
        </div>
        <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.5, margin: 0 }}>
          "Aliyev 8, Karimov 9..." deng — AI avtomatik qayd etadi
        </p>
      </div>

      {/* Footer */}
      <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#C9A227', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: '#003366', flexShrink: 0 }}>SY</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 12.5 }}>Sherzod Yusupov</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10.5 }}>Matematika o'qituvchisi</div>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
