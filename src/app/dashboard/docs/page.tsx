'use client'

import { useState } from 'react'
import { Search, Plus, Upload, FileText, CheckCircle, Clock, Download } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { mockDocuments } from '@/lib/mock/data'
import type { Document } from '@/lib/types'

export default function DocsPage() {
  const [search, setSearch] = useState('')
  const [showUpload, setShowUpload] = useState(false)

  const filtered = mockDocuments.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase())
  )

  const signed = filtered.filter(d => d.signed).length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#111827' }}>Hujjatlar boshqaruvi</h1>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>Jami {filtered.length} ta hujjat, {signed} ta imzolangan</p>
        </div>
        <button className="btn-primary" onClick={() => setShowUpload(true)}>
          <Upload size={16} />Yangi hujjat
        </button>
      </div>

      <div style={{ position: 'relative', maxWidth: 380, marginBottom: 16 }}>
        <Search size={15} style={{ position: 'absolute', left: 12, top: 10, color: '#9ca3af' }} />
        <input className="form-input" style={{ paddingLeft: 36 }} placeholder="Hujjat qidirish..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>№</th><th>Nomi</th><th>Sana</th><th>Imzolangan</th><th>Holat</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id}>
                <td style={{ fontWeight: 600, color: '#6b7280' }}>{d.number}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FileText size={15} color="#003366" />
                    <span style={{ fontWeight: 600 }}>{d.title}</span>
                  </div>
                </td>
                <td style={{ color: '#6b7280' }}>{d.date}</td>
                <td>
                  {d.signed ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#15803d', fontSize: 13 }}>
                      <CheckCircle size={14} /> {d.signed_by}
                    </span>
                  ) : (
                    <span style={{ color: '#d97706', fontSize: 13 }}>Kutilmoqda</span>
                  )}
                </td>
                <td>
                  <Badge variant={d.signed ? 'success' : 'warning'}>{d.signed ? 'Imzolangan' : "Imzolanmagan"}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showUpload} onClose={() => setShowUpload(false)} title="Yangi hujjat yuklash">
        <div className="form-group">
          <label className="form-label">Hujjat nomi</label>
          <input className="form-input" placeholder="Hujjat nomi" />
        </div>
        <div className="form-group">
          <label className="form-label">Fayl</label>
          <div style={{ border: '2px dashed #d1d5db', borderRadius: 8, padding: 30, textAlign: 'center', cursor: 'pointer', color: '#6b7280', fontSize: 13 }}>
            <Upload size={20} style={{ margin: '0 auto 8px', display: 'block' }} />
            Faylni tanlash yoki bu yerga tashlang
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
          <button className="btn-outline" onClick={() => setShowUpload(false)}>Bekor qilish</button>
          <button className="btn-primary">Yuklash</button>
        </div>
      </Modal>
    </div>
  )
}
