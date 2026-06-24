'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Users, MessageSquare, Search, Phone, Image, Paperclip } from 'lucide-react'

type ChatTab = 'parents' | 'collective'

const parents = [
  { id: 1, name: 'Karim Nazarov', child: 'Alisher · 5B', lastMsg: 'Rahmat, tushundim', time: '09:15', unread: 0, online: true },
  { id: 2, name: 'Zuhra Mirzaeva', child: 'Kamola · 5B', lastMsg: 'Bahosi uchun rahmat!', time: 'Kecha', unread: 2, online: false },
  { id: 3, name: 'Nodir Toshmatov', child: 'Sardor · 5B', lastMsg: 'Ertaga kela olamizmi?', time: 'Kecha', unread: 1, online: false },
  { id: 4, name: 'Barno Xolmatov', child: 'Jasur · 5B', lastMsg: 'Kechirasiz, men tushundim', time: 'Dush', unread: 0, online: true },
  { id: 5, name: 'Dilnoza Ergasheva', child: 'Zulfiya · 5B', lastMsg: 'Yaxshi, mayli', time: 'Dush', unread: 0, online: false },
]

const convos: Record<number, { id: number; from: 'teacher' | 'parent'; text: string; time: string }[]> = {
  1: [
    { id: 1, from: 'teacher', text: 'Assalomu alaykum! Alisher bugun darsda juda yaxshi ishtirok etdi, bahosi 9.', time: '08:45' },
    { id: 2, from: 'parent', text: 'Voy, juda sog\' bo\'ling! Maqtashga arzidi.', time: '09:10' },
    { id: 3, from: 'teacher', text: 'Ertaga matematika testimiz bor. Uyda 7-8 mashqlarni qayta ko\'rib chiqsin.', time: '09:12' },
    { id: 4, from: 'parent', text: 'Rahmat, tushundim', time: '09:15' },
  ],
  2: [
    { id: 1, from: 'teacher', text: 'Kamolaning uy vazifasi haqida xabar qilmoqchi edim.', time: 'Kecha 14:00' },
    { id: 2, from: 'parent', text: 'Ha, nima bo\'ldi?', time: 'Kecha 14:30' },
    { id: 3, from: 'teacher', text: 'Darslik 87-betdagi 3-mashqni bajarmabdi. Bugun bajarsin.', time: 'Kecha 14:32' },
    { id: 4, from: 'parent', text: 'Bahosi uchun rahmat!', time: 'Kecha 15:00' },
  ],
}

export default function ChatPage() {
  const [tab, setTab] = useState<ChatTab>('parents')
  const [selected, setSelected] = useState<number | null>(1)
  const [messages, setMessages] = useState(convos)
  const [input, setInput] = useState('')
  const [broadcast, setBroadcast] = useState('')
  const [sent, setSent] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [selected, messages])

  const send = () => {
    if (!input.trim() || !selected) return
    const msg = { id: Date.now(), from: 'teacher' as const, text: input, time: 'Hozir' }
    setMessages(prev => ({ ...prev, [selected]: [...(prev[selected] || []), msg] }))
    setInput('')
  }

  const sendBroadcast = () => {
    if (!broadcast.trim()) return
    setSent(true)
    setBroadcast('')
    setTimeout(() => setSent(false), 3000)
  }

  const activeParent = parents.find(p => p.id === selected)
  const chat = selected ? (messages[selected] || []) : []

  return (
    <div style={{ display: 'flex', gap: 0, height: 'calc(100vh - 120px)', minHeight: 480 }}>
      {/* Tabs + list */}
      <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: '10px 0 0 10px', border: '1px solid #e5e7eb', borderRight: 'none' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
          {[
            { id: 'parents' as const, label: 'Ota-onalar', icon: MessageSquare },
            { id: 'collective' as const, label: 'Kollektiv', icon: Users },
          ].map(t => {
            const Icon = t.icon
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '12px 8px', border: 'none', background: 'none', fontSize: 12.5, fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? '#003366' : '#9ca3af', borderBottom: tab === t.id ? '2px solid #003366' : '2px solid transparent', cursor: 'pointer' }}>
                <Icon size={14} />
                {t.label}
              </button>
            )
          })}
        </div>

        {tab === 'parents' && (
          <>
            <div style={{ padding: '10px 12px', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ position: 'relative' }}>
                <Search size={13} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input placeholder="Qidirish..." style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 7, padding: '6px 9px 6px 28px', fontSize: 12.5, outline: 'none', background: '#f9fafb' }} />
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {parents.map(p => (
                <div key={p.id} onClick={() => setSelected(p.id)}
                  style={{ padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: selected === p.id ? 'rgba(0,51,102,0.05)' : 'transparent', borderLeft: selected === p.id ? '3px solid #003366' : '3px solid transparent' }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div className="avatar" style={{ width: 36, height: 36, fontSize: 12 }}>
                      {p.name.split(' ').map(w => w[0]).join('')}
                    </div>
                    {p.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: 9, height: 9, background: '#15803d', borderRadius: '50%', border: '2px solid #fff' }} />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{p.name}</span>
                      <span style={{ fontSize: 11, color: '#9ca3af' }}>{p.time}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: '#9ca3af' }}>{p.child}</div>
                    <div style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.lastMsg}</div>
                  </div>
                  {p.unread > 0 && (
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#003366', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.unread}</div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'collective' && (
          <div style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 12.5, color: '#6b7280', fontWeight: 500 }}>Guruhlar</div>
            {['5B ota-onalar (30)', '7A ota-onalar (29)', '9C ota-onalar (25)', 'Barcha o\'qituvchilar (84)'].map(g => (
              <div key={g} style={{ padding: '9px 12px', background: '#f9fafb', borderRadius: 8, border: '1px solid #e5e7eb', cursor: 'pointer', fontSize: 13, color: '#374151', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Users size={14} color="#9ca3af" />
                {g}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: '0 10px 10px 0', border: '1px solid #e5e7eb' }}>
        {tab === 'parents' && selected && activeParent && (
          <>
            {/* Header */}
            <div style={{ padding: '12px 18px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="avatar" style={{ width: 36, height: 36 }}>{activeParent.name.split(' ').map(w => w[0]).join('')}</div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{activeParent.name}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{activeParent.child} · {activeParent.online ? 'Online' : 'Offline'}</div>
                </div>
              </div>
              <button style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: 7, padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#374151' }}>
                <Phone size={13} />Qo'ng'iroq
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {chat.map(msg => (
                <div key={msg.id} style={{ display: 'flex', justifyContent: msg.from === 'teacher' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '72%', padding: '9px 13px', borderRadius: msg.from === 'teacher' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: msg.from === 'teacher' ? '#003366' : '#f3f4f6',
                    color: msg.from === 'teacher' ? '#fff' : '#111827',
                    fontSize: 13.5, lineHeight: 1.5
                  }}>
                    <div>{msg.text}</div>
                    <div style={{ fontSize: 11, opacity: 0.6, textAlign: 'right', marginTop: 3 }}>{msg.time}</div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: 8, alignItems: 'center' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4 }}><Paperclip size={17} /></button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 4 }}><Image size={17} /></button>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Xabar yozing..."
                style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: 20, padding: '8px 14px', fontSize: 13.5, outline: 'none', background: '#f9fafb' }} />
              <button onClick={send}
                style={{ width: 36, height: 36, borderRadius: '50%', background: input ? '#003366' : '#e5e7eb', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.15s' }}>
                <Send size={15} color={input ? '#fff' : '#9ca3af'} />
              </button>
            </div>
          </>
        )}

        {tab === 'collective' && (
          <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: '#111827' }}>Ommaviy xabar yuborish</div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Kimga yuborilsin?</label>
              <select className="form-select">
                <option>5B ota-onalari (30 kishi)</option>
                <option>7A ota-onalari (29 kishi)</option>
                <option>Barcha o'quvchilar ota-onalari (142 kishi)</option>
                <option>Barcha o'qituvchilar (84 kishi)</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Xabar matni</label>
              <textarea value={broadcast} onChange={e => setBroadcast(e.target.value)}
                className="form-input" rows={5}
                style={{ resize: 'vertical', fontFamily: 'inherit' }}
                placeholder="Eslatma: Ertaga matematika testi bo'ladi. O'quvchilar uyda yaxshilab tayyorlansin..." />
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <button onClick={sendBroadcast}
                style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 20px', borderRadius: 8, border: 'none', background: broadcast ? '#003366' : '#e5e7eb', color: broadcast ? '#fff' : '#9ca3af', fontSize: 13.5, fontWeight: 500, cursor: broadcast ? 'pointer' : 'not-allowed' }}>
                <Send size={15} />Xabar yuborish
              </button>
              {sent && <span style={{ fontSize: 13, color: '#15803d', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5 }}>✓ Xabar muvaffaqiyatli yuborildi!</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
