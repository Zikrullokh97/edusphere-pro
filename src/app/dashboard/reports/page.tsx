'use client'

import { useState } from 'react'
import { Download, FileSpreadsheet, FileText, BarChart3, TrendingUp, Users, DollarSign, GraduationCap } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const reportTypes = [
  { title: 'Davomat hisoboti', desc: 'Oylik davomat statistikasi', icon: Users, color: '#003366' },
  { title: 'Moliya hisoboti', desc: 'Tushum va xarajatlar', icon: DollarSign, color: '#C9A227' },
  { title: "O'qituvchi yuklamasi", desc: "Yuklama va soatlar", icon: GraduationCap, color: '#0f766e' },
  { title: 'Imtihon natijalari', desc: 'Ortacha ball va statistikalar', icon: TrendingUp, color: '#7c3aed' },
]

const monthlyData = [
  { month: 'Yan', students: 820, teachers: 48 },
  { month: 'Fev', students: 835, teachers: 49 },
  { month: 'Mar', students: 845, teachers: 50 },
  { month: 'Apr', students: 860, teachers: 51 },
  { month: 'May', students: 870, teachers: 52 },
  { month: 'Iyun', students: 874, teachers: 52 },
]

export default function ReportsPage() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>Davlat hisobotlari</h1>
        <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Statistika, tahlil va eksport</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {reportTypes.map((r, i) => {
          const Icon = r.icon
          return (
            <div className="card" key={i} style={{ cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = r.color; e.currentTarget.style.boxShadow = `0 0 0 3px ${r.color}10` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ padding: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${r.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Icon size={20} color={r.color} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 2 }}>{r.title}</div>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 12 }}>{r.desc}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn-outline" style={{ padding: '4px 10px', fontSize: 12, gap: 4 }}>
                    <FileSpreadsheet size={12} />Excel
                  </button>
                  <button className="btn-outline" style={{ padding: '4px 10px', fontSize: 12, gap: 4 }}>
                    <FileText size={12} />PDF
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title"><BarChart3 size={16} color="#003366" />Maktab statistikasi (oylik)</div>
        </div>
        <div className="card-body" style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="students" fill="#003366" radius={[4, 4, 0, 0]} name="O'quvchilar" />
              <Bar dataKey="teachers" fill="#C9A227" radius={[4, 4, 0, 0]} name="O'qituvchilar" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
