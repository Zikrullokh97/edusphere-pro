'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Table } from '@/components/ui/Table'
import { Modal } from '@/components/ui/Modal'
import { mockExpenses } from '@/lib/mock/data'
import type { Expense } from '@/lib/types'

const formatCurrency = (n: number) => new Intl.NumberFormat('uz-UZ').format(n)
const categoryColors: Record<string, string> = {
  "Kommunal": '#003366', "O'quv qurollari": '#C9A227', "Ta'mirlash": '#dc2626',
  "Kantselyariya": '#0f766e', "Transport": '#7c3aed'
}

export default function FinanceExpensesPage() {
  const [showAdd, setShowAdd] = useState(false)

  const columns = [
    { key: 'category', title: 'Kategoriya', render: (e: Expense) => (
      <span style={{ color: categoryColors[e.category] || '#6b7280', fontWeight: 500 }}>{e.category}</span>
    )},
    { key: 'amount', title: 'Miqdor', render: (e: Expense) => (
      <span style={{ fontWeight: 700 }}>{formatCurrency(e.amount)} so'm</span>
    )},
    { key: 'date', title: 'Sana' },
    { key: 'note', title: 'Izoh' },
  ]

  const total = mockExpenses.reduce((s, e) => s + e.amount, 0)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>Xarajatlar & hisobot</h1>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Jami xarajat: {formatCurrency(total)} so'm</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(true)}>
          <Plus size={16} />Yangi xarajat
        </button>
      </div>

      <div className="card">
        <Table columns={columns} data={mockExpenses} emptyMessage="Xarajatlar mavjud emas" rowKey="id" />
      </div>

      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="Yangi xarajat qo'shish">
        <div className="form-group">
          <label className="form-label">Kategoriya</label>
          <select className="form-select">
            <option>Kommunal</option>
            <option>O'quv qurollari</option>
            <option>Ta'mirlash</option>
            <option>Kantselyariya</option>
            <option>Transport</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Miqdor</label>
          <input className="form-input" type="number" placeholder="0" />
        </div>
        <div className="form-group">
          <label className="form-label">Sana</label>
          <input className="form-input" type="date" />
        </div>
        <div className="form-group">
          <label className="form-label">Izoh</label>
          <input className="form-input" placeholder="Qisqacha tavsif" />
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="btn-outline" onClick={() => setShowAdd(false)}>Bekor qilish</button>
          <button className="btn-primary">Saqlash</button>
        </div>
      </Modal>
    </div>
  )
}
