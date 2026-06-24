'use client'

import { useState } from 'react'
import { Scan, Hand, Send, CheckCircle2, XCircle, Clock, Users, TrendingUp } from 'lucide-react'

const classes = ['5B', '7A', '9C', '5A', '8B']

const students: Record<string, { id: number; name: string; faceId: boolean; status: 'present' | 'absent' | 'late' | null }[]> = {
  '5B': [
    { id: 1, name: 'Alisher Nazarov', faceId: true, status: 'present' },
    { id: 2, name: 'Kamola Mirzaeva', faceId: true, status: 'present' },
    { id: 3, name: 'Sardor Toshmatov', faceId: false, status: null },
    { id: 4, name: 'Zulfiya Ergasheva', faceId: true, status: 'present' },
    { id: 5, name: 'Jasur Xolmatov', faceId: false, status: 'absent' },
    { id: 6, name: 'Nilufar Qodirov', faceId: true, status: 'present' },
    { id: 7, name: 'Bobur Umarov', faceId: false, status: 'late' },
    { id: 8, name: 'Malika Rahimov', faceId: true, status: 'present' },
    { id: 9, name: 'Temur Xasanov', faceId: false, status: null },
    { id: 10, name: 'Dilnoza Yusupova', faceId: true, status: 'present' },
  ],
}

type AttendStatus = 'present' | 'absent' | 'late' | null

export default function AttendancePage() {
  const [selectedClass, setSelectedClass] = useState('5B')
  const [mode, setMode] = useState<'faceId' | 'manual'>('manual')
  const [data, setData] = useState(students)
  const [smsSent, setSmsSent] = useState(false)
  const [scanning, setScanning] = useState(false)

  const list = data[selectedClass] || []
  const present = list.filter(s => s.status === 'present').length
  const absent = list.filter(s => s.status === 'absent').length
  const late = list.filter(s => s.status === 'late').length
  const unmarked = list.filter(s => s.status === null).length

  const setStatus = (id: number, status: AttendStatus) => {
    setData(prev => ({
      ...prev,
      [selectedClass]: prev[selectedClass].map(s => s.id === id ? { ...s, status } : s)
    }))
  }

  const runFaceId = () => {
    setScanning(true)
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        [selectedClass]: prev[selectedClass].map(s => s.faceId ? { ...s, status: 'present' } : s)
      }))
      setScanning(false)
    }, 2000)
  }

  const sendSMS = () => {
    setSmsSent(true)
    setTimeout(() => setSmsSent(false), 3000)
  }

  const statusColor = { present: '#15803d', absent: '#dc2626', late: '#d97706', null: '#9ca3af' }
  const statusBg   = { present: '#dcfce7', absent: '#fee2e2', late: '#fef3c7', null: '#f3f4f6' }
  const statusLabel= { present: 'Keldi', absent: 'Kelmadi', late: 'Kech keldi', null: '—' }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {classes.map(c => (
            <button key={c} onClick={() => setSelectedClass(c)}
              style={{
                padding: '7px 16px', borderRadius: 8, border: '1px solid',
                borderColor: selectedClass === c ? '#003366' : '#e5e7eb',
                background: selectedClass === c ? '#003366' : '#fff',
                color: selectedClass === c ? '#fff' : '#374151',
                fontWeight: selectedClass === c ? 600 : 400,
                fontSize: 13, cursor: 'pointer'
              }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => { setMode('faceId'); runFaceId() }}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 8, border: '1px solid #003366', background: mode === 'faceId' ? '#003366' : '#fff', color: mode === 'faceId' ? '#fff' : '#003366', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            <Scan size={15} />
            {scanning ? 'Skanlanmoqda...' : 'Face ID'}
          </button>
          <button onClick={() => setMode('manual')}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: mode === 'manual' ? '#f9fafb' : '#fff', color: '#374151', fontSize: 13, cursor: 'pointer' }}>
            <Hand size={15} />
            Qo'lda
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Jami', value: list.length, icon: Users, color: '#003366', bg: 'rgba(0,51,102,0.08)' },
          { label: 'Keldi', value: present, icon: CheckCircle2, color: '#15803d', bg: '#dcfce7' },
          { label: 'Kelmadi', value: absent, icon: XCircle, color: '#dc2626', bg: '#fee2e2' },
          { label: 'Belgilanmagan', value: unmarked, icon: Clock, color: '#d97706', bg: '#fef3c7' },
        ].map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color={s.color} />
              </div>
              <div>
                <div className="stat-label">{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Face ID scanning animation */}
      {scanning && (
        <div style={{ background: 'rgba(0,51,102,0.04)', border: '1px dashed rgba(0,51,102,0.3)', borderRadius: 10, padding: '16px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid transparent', borderTopColor: '#003366', animation: 'spin 0.8s linear infinite' }} />
          <span style={{ fontSize: 13.5, color: '#003366', fontWeight: 500 }}>Face ID orqali o'quvchilar skanlanmoqda...</span>
        </div>
      )}

      {/* Student list */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div className="card-title">
            <TrendingUp size={16} color="#C9A227" />
            {selectedClass} — o'quvchilar ro'yxati ({list.length} nafar)
          </div>
          <div style={{ fontSize: 13, color: '#6b7280' }}>
            Davomad: <strong style={{ color: '#003366' }}>{list.length ? Math.round((present / list.length) * 100) : 0}%</strong>
          </div>
        </div>
        <div style={{ padding: '0 4px' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Ism familiya</th>
                <th>Face ID</th>
                <th>Holat</th>
                <th>Belgilash</th>
                <th>SMS</th>
              </tr>
            </thead>
            <tbody>
              {list.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ color: '#9ca3af', fontSize: 12 }}>{i + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <div className="avatar" style={{ fontSize: 11, background: 'rgba(0,51,102,0.1)', color: '#003366' }}>
                        {s.name.split(' ').map(w => w[0]).join('')}
                      </div>
                      <span style={{ fontWeight: 500 }}>{s.name}</span>
                    </div>
                  </td>
                  <td>
                    {s.faceId
                      ? <span style={{ fontSize: 12, color: '#15803d' }}>✓ Ro'yxatda</span>
                      : <span style={{ fontSize: 12, color: '#9ca3af' }}>Yo'q</span>}
                  </td>
                  <td>
                    <span style={{
                      background: statusBg[s.status ?? 'null'] ,
                      color: statusColor[s.status ?? 'null'],
                      fontSize: 11.5, fontWeight: 500, padding: '2px 9px', borderRadius: 20
                    }}>
                      {statusLabel[s.status ?? 'null']}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {(['present', 'absent', 'late'] as const).map(st => (
                        <button key={st} onClick={() => setStatus(s.id, st)}
                          style={{
                            padding: '3px 9px', borderRadius: 6, border: '1px solid',
                            fontSize: 11.5, cursor: 'pointer', fontWeight: s.status === st ? 600 : 400,
                            borderColor: s.status === st ? statusColor[st] : '#e5e7eb',
                            background: s.status === st ? statusBg[st] : '#fff',
                            color: s.status === st ? statusColor[st] : '#9ca3af',
                          }}>
                          {st === 'present' ? '✓' : st === 'absent' ? '✗' : '⏱'}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td>
                    {s.status === 'absent' && (
                      <button onClick={sendSMS}
                        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 6, border: '1px solid #dc2626', background: '#fff', color: '#dc2626', fontSize: 11.5, cursor: 'pointer' }}>
                        <Send size={12} />SMS
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bulk SMS */}
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={sendSMS}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', borderRadius: 8, border: 'none', background: absent > 0 ? '#dc2626' : '#9ca3af', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
          <Send size={15} />
          Kelmaganlar ota-onasiga SMS ({absent} nafar)
        </button>
        {smsSent && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#15803d', fontWeight: 500 }}>
            <CheckCircle2 size={15} />SMS yuborildi!
          </div>
        )}
        <button className="btn-primary" style={{ marginLeft: 'auto' }}>
          Davomatni saqlash
        </button>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
