

'use client'



import Link from 'next/link'

import { usePathname } from 'next/navigation'

import {

  LayoutDashboard, Users, Coins, FileText, MessageCircle, BarChart3,

  CalendarClock, BarChartBig, School, ClipboardList, BookOpen,

  PartyPopper, AlertTriangle, Brain, Footprints,

  CreditCard, ChevronDown, LogOut

} from 'lucide-react'

import { useState } from 'react'

import clsx from 'clsx'



const navigation = [

  {

    section: 'Direktor paneli',

    items: [

      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },

      {

        label: 'Hodimlar (HR)', icon: Users, href: '/dashboard/hr',

        sub: [

          { href: '/dashboard/hr', label: 'Barcha xodimlar' },

          { href: '/dashboard/salary', label: 'Ish haqi & davomati' },

        ]

      },

      {

        label: 'Moliya moduli', icon: Coins, href: '/dashboard/finance',

        sub: [

          { href: '/dashboard/finance', label: "To'lovlar" },

          { href: '/dashboard/finance/expenses', label: 'Xarajatlar & hisobot' },

        ]

      },

      { href: '/dashboard/docs', label: 'Hujjatlar', icon: FileText },

      { href: '/dashboard/parents', label: 'Ota-onalar', icon: MessageCircle },

      { href: '/dashboard/reports', label: 'Davlat hisobotlari', icon: BarChart3 },

    ]

  },

  {

    section: 'Zavuch paneli',

    items: [

      { href: '/dashboard/schedule', label: 'Dars jadvali', icon: CalendarClock },

      { href: '/dashboard/workload', label: "O'qituvchi yuklamasi", icon: BarChartBig },

      { href: '/dashboard/classes', label: 'Sinflar & guruhlar', icon: School },

      { href: '/dashboard/exams', label: 'Imtihon jadvali', icon: ClipboardList },

      { href: '/dashboard/methodical', label: 'Metodik ishlar', icon: BookOpen },

    ]

  },

  {

    section: 'Tarbiyaviy ishlar',

    items: [

      { href: '/dashboard/events', label: 'Tadbirlar rejasi', icon: PartyPopper },

      { href: '/dashboard/discipline', label: 'Intizom holati', icon: AlertTriangle },

      { href: '/dashboard/psycho', label: 'Psixolog yozuvlari', icon: Brain },

      { href: '/dashboard/sport', label: "Sport & to'garaklar", icon: Footprints },

    ]

  }

]



export default function Sidebar() {

  const pathname = usePathname()

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({ 'Hodimlar (HR)': true, 'Moliya moduli': false })



  const toggle = (label: string) => setOpenMenus(p => ({ ...p, [label]: !p[label] }))



  return (

    <aside className="sidebar">

      {/* Logo */}

      <div style={{ padding: '18px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>

        <div style={{ width: 36, height: 36, background: '#C9A227', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 17, color: '#003366', flexShrink: 0 }}>E</div>

        <div>

          <div style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>EduSphere Pro</div>

          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10.5 }}>Smart School Ecosystem</div>

        </div>

      </div>



      {/* Nav */}

      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>

        {navigation.map(group => (

          <div key={group.section}>

            <div className="nav-section">{group.section}</div>

            {group.items.map(item => {

              const Icon = item.icon

              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))

              const hasSub = 'sub' in item && item.sub



              if (hasSub) {

                const isOpen = openMenus[item.label]

                return (

                  <div key={item.label}>

                    <button

                      onClick={() => toggle(item.label)}

                      className={clsx('nav-item w-full', isActive && 'active')}

                      style={{ justifyContent: 'space-between', textAlign: 'left' }}

                    >

                      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

                        <Icon size={17} />

                        {item.label}

                      </span>

                      <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />

                    </button>

                    {isOpen && item.sub.map(s => (

                      <Link key={s.href} href={s.href} className={clsx('nav-sub', pathname === s.href && 'active')}>

                        {s.label}

                      </Link>

                    ))}

                  </div>

                )

              }



              return (

                <Link key={item.href} href={item.href} className={clsx('nav-item', isActive && 'active')}>

                  <Icon size={17} />

                  {item.label}

                </Link>

              )

            })}

          </div>

        ))}

      </nav>



      {/* Footer */}

      <div style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>

          <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#C9A227', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#003366', flexShrink: 0 }}>AK</div>

          <div style={{ flex: 1 }}>

            <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>Aziz Karimov</div>

            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>Direktor</div>

          </div>

          <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 4 }}>

            <LogOut size={15} />

          </button>

        </div>

      </div>

    </aside>

  )

}
