'use client'

import { useState } from 'react'
import { Upload, Zap, Video, FileText, File, Trash2, Play, Plus, CheckCircle2, Loader2 } from 'lucide-react'

const materials = [
  { id: 1, name: 'Kasrlar_5-sinf.pdf', type: 'pdf', size: '2.4 MB', class: '5B', date: '20.06.25', downloads: 28 },
  { id: 2, name: 'Algebra_7-sinf_darslik.pdf', type: 'pdf', size: '8.1 MB', class: '7A', date: '18.06.25', downloads: 31 },
  { id: 3, name: 'Trigonometriya_video.mp4', type: 'video', size: '124 MB', class: '9C', date: '15.06.25', downloads: 19 },
  { id: 4, name: 'Tenglamalar_test.docx', type: 'doc', size: '340 KB', class: '7A', date: '12.06.25', downloads: 35 },
]

const aiTestQuestions = [
  { q: "Quyidagi kasrlardan qaysi biri to'g'ri kasr?", opts: ['5/3', '2/7', '8/5', '11/4'], ans: 1 },
  { q: "3/4 va 1/2 ning yig'indisi nechaga teng?", opts: ['4/6', '5/4', '4/8', '2/3'], ans: 1 },
  { q: "2/3 × 3/4 = ?", opts: ['6/12', '1/2', '5/7', '6/7'], ans: 1 },
]

export default function MaterialsPage() {
  const [tab, setTab] = useState<'files' | 'ai_test' | 'online'>('files')
  const [dragging, setDragging] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [aiTopic, setAiTopic] = useState('')
  const [liveDuration, setLiveDuration] = useState(0)
  const [liveActive, setLiveActive] = useState(false)

  const generateTest = () => {
    if (!aiTopic) return
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 2200)
  }

  const startLive = () => {
    setLiveActive(true)
    const t = setInterval(() => setLiveDuration(p => p + 1), 1000)
    return () => clearInterval(t)
  }

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const fileIcon = (type: string) => {
    if (type === 'pdf')   return <FileText size={18} color="#dc2626" />
    if (type === 'video') return <Play size={18} color="#7c3aed" />
    return <File size={18} color="#1e40af" />
  }

  const tabs = [
    { id: 'files' as const, label: 'Fayllar', icon: Upload },
    { id: 'ai_test' as const, label: 'AI Test', icon: Zap },
    { id: 'online' as const, label: 'Online dars', icon: Video },
  ]

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, background: '#f3f4f6', borderRadius: 9, padding: 4, marginBottom: 22, width: 'fit-content' }}>
        {tabs.map(t => {
          const Icon = t.icon
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '7px 18px', borderRadius: 7, border: 'none', fontSize: 13.5, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s', background: tab === t.id ? '#fff' : 'transparent', color: tab === t.id ? '#003366' : '#6b7280', boxShadow: tab === t.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
              <Icon size={15} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* FILES */}
      {tab === 'files' && (
        <div>
          {/* Upload zone */}
          <div onDragOver={e => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false) }}
            style={{
              border: `2px dashed ${dragging ? '#003366' : '#d1d5db'}`,
              borderRadius: 12, padding: '32px 20px', textAlign: 'center',
              background: dragging ? 'rgba(0,51,102,0.04)' : '#fafafa',
              marginBottom: 20, transition: 'all 0.2s', cursor: 'pointer'
            }}>
            <Upload size={32} color={dragging ? '#003366' : '#9ca3af'} style={{ margin: '0 auto 12px' }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
              Faylni shu yerga tashlang
            </div>
            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 14 }}>
              PDF, video, Word, PowerPoint qabul qilinadi · Maks: 200MB
            </div>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 8, border: 'none', background: '#003366', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              <Plus size={15} />Fayl tanlash
              <input type="file" style={{ display: 'none' }} multiple accept=".pdf,.mp4,.docx,.pptx" />
            </label>
          </div>

          {/* File list */}
          <div className="card">
            <div className="card-header">
              <div className="card-title"><FileText size={16} color="#C9A227" />Yuklangan materiallar</div>
              <div style={{ fontSize: 12, color: '#9ca3af' }}>{materials.length} ta fayl</div>
            </div>
            <div style={{ padding: '0 4px' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Fayl nomi</th>
                    <th>Sinf</th>
                    <th>Hajm</th>
                    <th>Sana</th>
                    <th>Yuklab oldi</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map(m => (
                    <tr key={m.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {fileIcon(m.type)}
                          <span style={{ fontWeight: 500, fontSize: 13 }}>{m.name}</span>
                        </div>
                      </td>
                      <td><span className="badge badge-navy">{m.class}</span></td>
                      <td style={{ color: '#6b7280', fontSize: 12 }}>{m.size}</td>
                      <td style={{ color: '#6b7280', fontSize: 12 }}>{m.date}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <div className="progress" style={{ width: 60 }}>
                            <div className="progress-fill" style={{ width: `${Math.min(m.downloads * 2.8, 100)}%` }} />
                          </div>
                          <span style={{ fontSize: 12, color: '#6b7280' }}>{m.downloads}</span>
                        </div>
                      </td>
                      <td>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', padding: 4 }}>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* AI TEST */}
      {tab === 'ai_test' && (
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div className="card-title"><Zap size={16} color="#C9A227" />AI yordamida test yaratish</div>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Mavzu</label>
                  <input className="form-input" placeholder="Kasrlarni ko'paytirish" value={aiTopic}
                    onChange={e => setAiTopic(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Sinf</label>
                  <select className="form-select">
                    <option>5B</option><option>7A</option><option>9C</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Savollar soni</label>
                  <select className="form-select">
                    <option>10</option><option>15</option><option>20</option><option>25</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={generateTest} disabled={!aiTopic || generating}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 8, border: 'none', background: aiTopic && !generating ? '#C9A227' : '#e5e7eb', color: aiTopic && !generating ? '#003366' : '#9ca3af', fontWeight: 600, fontSize: 13.5, cursor: aiTopic ? 'pointer' : 'not-allowed' }}>
                  {generating ? <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Zap size={15} />}
                  {generating ? 'AI ishlamoqda...' : 'Test yaratish'}
                </button>
              </div>
            </div>
          </div>

          {generated && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <CheckCircle2 size={16} color="#15803d" />
                  Test tayyor: "{aiTopic}" — 10 savol
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-outline" style={{ fontSize: 12, padding: '5px 12px' }}>PDF eksport</button>
                  <button className="btn-primary" style={{ fontSize: 12, padding: '5px 12px' }}>O'quvchilarga yuborish</button>
                </div>
              </div>
              <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {aiTestQuestions.map((q, qi) => (
                  <div key={qi} style={{ background: '#f9fafb', borderRadius: 8, padding: '12px 14px' }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: '#111827', marginBottom: 10 }}>
                      {qi + 1}. {q.q}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                      {q.opts.map((opt, oi) => (
                        <div key={oi} style={{
                          padding: '6px 12px', borderRadius: 7, border: '1px solid',
                          borderColor: oi === q.ans ? '#15803d' : '#e5e7eb',
                          background: oi === q.ans ? '#dcfce7' : '#fff',
                          color: oi === q.ans ? '#15803d' : '#374151',
                          fontSize: 13, fontWeight: oi === q.ans ? 600 : 400
                        }}>
                          {String.fromCharCode(65 + oi)}. {opt}
                          {oi === q.ans && ' ✓'}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ color: '#9ca3af', fontSize: 12, textAlign: 'center' }}>...va yana 7 ta savol</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ONLINE LESSON */}
      {tab === 'online' && (
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-header">
              <div className="card-title"><Video size={16} color="#C9A227" />Online dars (WebRTC)</div>
              {liveActive && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#dc2626', animation: 'pulse 1.5s ease-in-out infinite' }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#dc2626' }}>LIVE {fmtTime(liveDuration)}</span>
                </div>
              )}
            </div>
            <div className="card-body">
              <div style={{ background: '#111827', borderRadius: 12, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
                {liveActive ? (
                  <>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #003366 0%, #001a33 100%)' }} />
                    <div style={{ position: 'relative', textAlign: 'center' }}>
                      <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#C9A227', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: '#003366', margin: '0 auto 10px' }}>SY</div>
                      <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Sherzod Yusupov</div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Kamera yoqilmagan</div>
                    </div>
                    {/* Student icons */}
                    <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 6 }}>
                      {['AN', 'KM', 'ST', 'ZE', 'JX'].map(init => (
                        <div key={init} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>{init}</div>
                      ))}
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>+23</div>
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
                    <Video size={40} style={{ margin: '0 auto 10px' }} />
                    <div style={{ fontSize: 14 }}>Dars hali boshlanmagan</div>
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Sinf</label>
                  <select className="form-select">
                    <option>5B — 30 o'quvchi</option>
                    <option>7A — 29 o'quvchi</option>
                    <option>9C — 25 o'quvchi</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Dars mavzusi</label>
                  <input className="form-input" placeholder="Kasrlarni ko'paytirish" />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                {!liveActive
                  ? <button onClick={startLive} className="btn-primary" style={{ gap: 8 }}>
                      <Video size={16} />Online darsni boshlash
                    </button>
                  : <button onClick={() => setLiveActive(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 8, border: 'none', background: '#dc2626', color: '#fff', fontSize: 13.5, fontWeight: 500, cursor: 'pointer' }}>
                      Darsni tugatish
                    </button>
                }
                {liveActive && (
                  <button className="btn-outline" style={{ gap: 7 }}>
                    <Plus size={14} />Ekranni ulashish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  )
}
