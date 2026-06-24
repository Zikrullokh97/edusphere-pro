'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Search, Plus, TrendingUp, TrendingDown, DollarSign, Wallet, CreditCard, BarChart3, Download } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Table } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { mockPayments, mockExpenses } from '@/lib/mock/data'
import type { Payment } from '@/lib/types'

const formatCurrency = (n: number) => new Intl.NumberFormat('uz-UZ').format(n)

const statusLabels: Record<string, string> = { paid: "To'langan", pending: "Kutilmoqda", overdue: "Muddati o'tgan" }

const categoryColors: Record<string, string> = {
  "Kommunal": '#003366', "O'quv qurollari": '#C9A227', "Ta'mirlash": '#dc2626',
  "Kantselyariya": '#0f766e', "Transport": '#7c3aed'
}

const expensePieData = mockExpenses.map(e => ({
  name: e.category, value: e.amount
}))

const totalIncome = mockPayments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
const totalExpense = mockExpenses.reduce((s, e) => s + e.amount, 0)
const balance = totalIncome - totalExpense

export default function FinancePage() {
  const [tab, setTab] = useState<'income' | 'expense'>('income')
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const paymentColumns = [
    { key: 'student_name', title: "O'quvchi", render: (p: Payment) => (
      <div>
        <div style={{ fontWeight: 600, color: '#111827' }}>{p.student_name}</div>
        <div style={{ fontSize: 12, color: '#6b7280' }}>{p.class_name}</div>
      </div>
    )},
    { key: 'type', title: 'To\'lov turi' },
    { key: 'amount', title: 'Miqdor', render: (p: Payment) => (
      <span style={{ fontWeight: 700 }}>{formatCurrency(p.amount)} so'm</span>
    )},
    { key: 'date', title: 'Sana' },
    { key: 'status', title: 'Holat', render: (p: Payment) => (
      <StatusBadge status={p.status} />
    )},
  ]

  const expenseColumns = [
    { key: 'category', title: 'Kategoriya', render: (e: typeof mockExpenses[0]) => (
      <span style={{ color: categoryColors[e.category] || '#6b7280', fontWeight: 500 }}>{e.category}</span>
    )},
    { key: 'amount', title: 'Miqdor', render: (e: typeof mockExpenses[0]) => (
      <span style={{ fontWeight: 700 }}>{formatCurrency(e.amount)} so'm</span>
    )},
    { key: 'date', title: 'Sana' },
    { key: 'note', title: 'Izoh' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>Moliya moduli</h1>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Kassa jurnali va moliyaviy hisobot</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-outline" style={{ gap: 6 }}>
            <Download size={14} />Hisobot
          </button>
          <button className="btn-primary" onClick={() => setShowPaymentModal(true)}>
            <Plus size={16} />Yangi to'lov
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div className="stat-label">Jami tushum</div>
              <div className="stat-value" style={{ color: '#15803d' }}>{formatCurrency(totalIncome)} so'm</div>
            </div>
            <TrendingUp size={20} color="#15803d" />
          </div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div className="stat-label">Jami xarajat</div>
              <div className="stat-value" style={{ color: '#b91c1c' }}>{formatCurrency(totalExpense)} so'm</div>
            </div>
            <TrendingDown size={20} color="#b91c1c" />
          </div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div className="stat-label">Balans</div>
              <div className="stat-value" style={{ color: balance >= 0 ? '#15803d' : '#b91c1c' }}>{formatCurrency(balance)} so'm</div>
            </div>
            <Wallet size={20} color="#003366" />
          </div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div className="stat-label">To'lovlar soni</div>
              <div className="stat-value">{mockPayments.length}</div>
            </div>
            <CreditCard size={20} color="#C9A227" />
          </div>
        </div>
      </div>

      {/* Two-column: Pie chart + Transactions */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 18, marginBottom: 20 }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title"><BarChart3 size={16} color="#003366" />Xarajatlar</div>
          </div>
          <div style={{ height: 220, padding: 10 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expensePieData} cx="50%" cy="50%" outerRadius={70} innerRadius={40} dataKey="value" paddingAngle={3}>
                  {expensePieData.map((_, i) => (
                    <Cell key={i} fill={Object.values(categoryColors)[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header" style={{ paddingBottom: 0, border: 'none' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className={tab === 'income' ? 'btn-primary' : 'btn-outline'} style={{ padding: '6px 14px', fontSize: 12.5 }}
                onClick={() => setTab('income')}>Tushumlar</button>
              <button className={tab === 'expense' ? 'btn-primary' : 'btn-outline'} style={{ padding: '6px 14px', fontSize: 12.5 }}
                onClick={() => setTab('expense')}>Xarajatlar</button>
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            {tab === 'income' ? (
              <Table columns={paymentColumns} data={mockPayments} emptyMessage="Ma'lumot topilmadi" rowKey="id" />
            ) : (
              <Table columns={expenseColumns as any} data={mockExpenses} emptyMessage="Ma'lumot topilmadi" rowKey="id" />
            )}
          </div>
        </div>
      </div>

      {/* Add Payment Modal */}
      <Modal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)} title="Yangi to'lov qo'shish">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="form-group">
            <label className="form-label">O'quvchi ismi</label>
            <input className="form-input" placeholder="Ism familiya" />
          </div>
          <div className="form-group">
            <label className="form-label">Sinf</label>
            <input className="form-input" placeholder="5A" />
          </div>
          <div className="form-group">
            <label className="form-label">To'lov turi</label>
            <select className="form-select">
              <option>O'quv to'lovi</option>
              <option>To'garak badali</option>
              <option>Imtihon to'lovi</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Miqdor</label>
            <input className="form-input" type="number" placeholder="350000" />
          </div>
          <div className="form-group">
            <label className="form-label">Sana</label>
            <input className="form-input" type="date" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="btn-outline" onClick={() => setShowPaymentModal(false)}>Bekor qilish</button>
          <button className="btn-primary">Saqlash</button>
        </div>
      </Modal>
    </div>
  )
}
