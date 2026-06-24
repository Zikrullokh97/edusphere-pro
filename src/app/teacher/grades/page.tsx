'use client'

import { useState, useRef } from 'react'
import { Mic, MicOff, Zap, BarChart2, TrendingUp, Award, ChevronDown } from 'lucide-react'

const classes = ['5B', '7A', '9C', '5A', '8B']

const initialGrades: Record<string, { id: number; name: string; grades: (number | null)[]; avg: number }[]> = {
  '5B': [
    { id: 1, name: 'Alisher Nazarov',  grades: [8, 9, 7, null, null], avg: 8.0 },
    { id: 2, name: 'Kamola Mirzaeva',  grades: [10, 9, 10, null, null], avg: 9.7 },
    { id: 3, name: 'Sardor Toshmatov', grades: [7, 6, 8, null, null], avg: 7.0 },
    { id: 4, name: 'Zulfiya Ergasheva',grades: [9, 9, 8, null, null], avg: 8.7 },
    { id: 5, name: 'Jasur Xolmatov',   grades: [5, 6, 5, null, null], avg: 5.3 },
    { id: 6, name: 'Nilufar Qodirov',  grades: [8, 8, 9, null, null], avg: 8.3 },
    { id: 7, name: 'Bobur Umarov',     grades: [7, 8, 7, null, null], avg: 7.3 },
    { id: 8, name: 'Malika Rahimov',   grades: [9, 10, 9, null, null], avg: 9.3 },
  ],
}

const DAYS = ['Dush', 'Sesh', 'Chor', 'Pay', 'Juma']

// Simulate AI voice parsing
function parseVoiceInput(text: string): Record<string, number> {
  const result: Record<string, number> = {}
  const regex = /([а-яёА-ЯЁa-zA-Zа-яёА-ЯЁ]+)\s*[-—–]\s*(\d+)/g
  let m
  while ((m = regex.exec(text)) !== null) {
    result[m[1].toLowerCase()] = parseInt(m[2])
  }
  return result
}

export default function GradesPage() {
  const [cls, setCls] = useState('5B')
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [voiceResult, setVoiceResult] = useState<Record<string, number>>({})
  const [grades, setGrades] = useState(initialGrades)
  const [activeDay, setActiveDay] = useState(2)
  const recognitionRef = useRef<any>(null)

  const list = grades[cls] || []

  const startVoice = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) {
      // Demo mode without real mic
      setListening(true)
      const demo = 'Nazarov — 8, Mirzaeva — 10, Toshmatov — 7, Ergasheva — 9, Xolmatov — 6'
      let i = 0
      const t = setInterval(() => {
        setTranscript(demo.slice(0, i += 6))
        if (i >= demo.length) {
          clearInterval(t)
          setListening(false)
          const parsed = parseVoiceInput(demo)
          setVoiceResult(parsed)
        }
      }, 80)
      return
    }
    const r = new SR()
    r.lang = 'uz-UZ'
    r.continuous = true
    r.interimResults = true
    r.onresult = (e: any) => {
      const t = Array.from(e.results).map((res: any) => res[0].transcript).join('')
      setTranscript(t)
      setVoiceResult(parseVoiceInput(t))
    }
    r.onend = () => setListening(false)
    recognitionRef.current = r
    r.start()
    setListening(true)
  }

  const stopVoice = () => {
    recognitionRef.current?.stop()
    setListening(false)
  }

  const applyVoiceGrades = () => {
    setGrades(prev => ({
      ...prev,
      [cls]: prev[cls].map(s => {
        const lastName = s.name.split(' ')[0].toLowerCase()
        const found = Object.entries(voiceResult).find(([k]) => lastName.includes(k) || k.includes(lastName))
        if (found) {
          const ng = [...s.grades]
          ng[activeDay] = found[1]
          const filled = ng.filter(x => x !== null) as number[]
          return { ...s, grades: ng, avg: filled.length ? +(filled.reduce((a, b) => a + b, 0) / filled.length).toFixed(1) : s.avg }
        }
        return s
      })
    }))
    setTranscript('')
    setVoiceResult({})
  }

  const setGrade = (sid: number, day: number, val: number | null) => {
    setGrades(prev => ({
      ...prev,
      [cls]: prev[cls].map(s => {
        if (s.id !== sid) return s
        const ng = [...s.grades]
        ng[day] = val
        const filled = ng.filter(x => x !== null) as number[]
        return { ...s, grades: ng, avg: filled.length ? +(filled.reduce((a, b) => a + b, 0) / filled.length).toFixed(1) : s.avg }
      })
    }))
  }

  const gradeColor = (g: number | null) => {
    if (!g) return { bg: '#f9fafb', color: '#9ca3af' }
    if (g >= 9)  return { bg: '#dcfce7', color: '#15803d' }
    if (g >= 7)  return { bg: '#dbeafe', color: '#1e40af' }
    if (g >= 5)  return { bg: '#fef3c7', color: '#92400e' }
    return { bg: '#fee2e2', color: '#991b1b' }
  }

  const classAvg = list.length ? +(list.reduce((a, s) => a + s.avg, 0) / list.length).toFixed(1) : 0

  return (
    <div>
      {/* Class selector + stats */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {classes.map(c => (
            <button key={c} onClick={() => setCls(c)}
              style={{ padding: '7px 16px', borderRadius: 8, border: '1px solid', borderColor: cls === c ? '#003366' : '#e5e7eb', background: cls === c ? '#003366' : '#fff', color: cls === c ? '#fff' : '#374151', fontWeight: cls === c ? 600 : 400, fontSize: 13, cursor: 'pointer' }}>
              {c}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div className="stat-card" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <BarChart2 size={16} color="#C9A227" />
            <div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>Sinf o'rtachasi</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#003366' }}>{classAvg}</div>
            </div>
          </div>
          <div className="stat-card" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Award size={16} color="#C9A227" />
            <div>
              <div style={{ fontSize: 11, color: '#6b7280' }}>A'lochilar</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#15803d' }}>{list.filter(s => s.avg >= 9).length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Voice panel */}
      <div style={{ background: listening ? 'rgba(0,51,102,0.04)' : '#fafafa', border: `1px solid ${listening ? '#003366' : '#e5e7eb'}`, borderRadius: 10, padding: 16, marginBottom: 18, transition: 'all 0.2s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: listening ? '#003366' : 'rgba(0,51,102,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
              <Mic size={15} color={listening ? '#C9A227' : '#003366'} />
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: '#111827' }}>
                AI Ovoz orqali baholash
                {listening && <span style={{ marginLeft: 8, fontSize: 12, color: '#003366', fontWeight: 400 }}>tinglash davom etmoqda...</span>}
              </div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>"Nazarov — 8, Mirzaeva — 9..." deng</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 4 }}>
              <span style={{ fontSize: 12, color: '#6b7280' }}>Kun:</span>
              <select value={activeDay} onChange={e => setActiveDay(+e.target.value)}
                style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: '4px 8px', fontSize: 12, background: '#fff', outline: 'none' }}>
                {DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}
              </select>
            </div>
            {!listening
              ? <button onClick={startVoice} className="btn-primary" style={{ padding: '7px 16px', gap: 6 }}>
                  <Mic size={14} />Boshlash
                </button>
              : <button onClick={stopVoice}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 7, border: 'none', background: '#dc2626', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                  <MicOff size={14} />To'xtatish
                </button>
            }
            {Object.keys(voiceResult).length > 0 &&
              <button onClick={applyVoiceGrades}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 7, border: 'none', background: '#C9A227', color: '#003366', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                <Zap size={14} />Qo'llash
              </button>
            }
          </div>
        </div>

        {/* Transcript */}
        {transcript && (
          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e5e7eb', padding: '10px 12px', marginTop: 8 }}>
            <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>Tanilgan matn:</div>
            <p style={{ fontSize: 13.5, color: '#111827', lineHeight: 1.5, margin: 0 }}>{transcript}</p>
            {Object.keys(voiceResult).length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                {Object.entries(voiceResult).map(([name, grade]) => (
                  <span key={name} style={{ background: '#dcfce7', color: '#15803d', fontSize: 12, fontWeight: 500, padding: '2px 9px', borderRadius: 20 }}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}: {grade}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grades table */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-header">
          <div className="card-title">
            <TrendingUp size={16} color="#C9A227" />
            Haftalik baholar — {cls}
          </div>
          <button className="btn-outline" style={{ fontSize: 12, padding: '5px 12px' }}>
            Choraklik hisobot
          </button>
        </div>
        <div style={{ padding: '0 4px', overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>O'quvchi</th>
                {DAYS.map((d, i) => (
                  <th key={i} style={{ textAlign: 'center', background: i === activeDay ? 'rgba(0,51,102,0.06)' : undefined }}>
                    {d} {i === activeDay && '✎'}
                  </th>
                ))}
                <th style={{ textAlign: 'center' }}>O'rtacha</th>
                <th style={{ textAlign: 'center' }}>Chorak</th>
              </tr>
            </thead>
            <tbody>
              {list.map(s => {
                const quarter = s.avg >= 9 ? 5 : s.avg >= 7.5 ? 4 : s.avg >= 5.5 ? 3 : s.avg >= 4 ? 2 : 1
                return (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div className="avatar" style={{ fontSize: 11 }}>
                          {s.name.split(' ').map(w => w[0]).join('')}
                        </div>
                        <span style={{ fontWeight: 500, fontSize: 13 }}>{s.name}</span>
                      </div>
                    </td>
                    {s.grades.map((g, di) => {
                      const gc = gradeColor(g)
                      return (
                        <td key={di} style={{ textAlign: 'center', background: di === activeDay ? 'rgba(0,51,102,0.03)' : undefined }}>
                          <input
                            type="number" min={1} max={10}
                            value={g ?? ''}
                            onChange={e => setGrade(s.id, di, e.target.value ? +e.target.value : null)}
                            style={{
                              width: 44, textAlign: 'center', padding: '4px',
                              border: `1px solid ${gc.bg === '#f9fafb' ? '#e5e7eb' : gc.bg}`,
                              borderRadius: 6, fontSize: 13, fontWeight: 600,
                              color: gc.color, background: gc.bg, outline: 'none',
                            }}
                          />
                        </td>
                      )
                    })}
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ ...gradeColor(s.avg), padding: '3px 10px', borderRadius: 20, fontSize: 13, fontWeight: 700, display: 'inline-block' }}>
                        {s.avg}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ ...gradeColor(quarter * 2 - 1), padding: '3px 10px', borderRadius: 20, fontSize: 14, fontWeight: 700, display: 'inline-block' }}>
                        {quarter}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* KPI */}
      <div className="card">
        <div className="card-header">
          <div className="card-title"><Award size={16} color="#C9A227" />KPI Analitika</div>
        </div>
        <div className="card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          {[
            { label: 'O\'quvchi sifat ko\'rsatkichi', value: '84%', trend: '+3%', color: '#003366' },
            { label: 'A\'lochilar ulushi', value: '31%', trend: '+5%', color: '#15803d' },
            { label: 'Qoniqarsiz o\'quvchilar', value: '8%', trend: '-2%', color: '#dc2626' },
            { label: 'O\'rtacha ball o\'zgarishi', value: '+0.4', trend: 'o\'sish', color: '#d97706' },
          ].map(k => (
            <div key={k.label} style={{ background: '#f9fafb', borderRadius: 8, padding: '12px 14px' }}>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: k.color }}>{k.value}</div>
              <div style={{ fontSize: 11.5, color: '#15803d', marginTop: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
                <TrendingUp size={11} />{k.trend}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
