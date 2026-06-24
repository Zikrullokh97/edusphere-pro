import { Loader2 } from 'lucide-react'

export default function Loading({ text = 'Yuklanmoqda...' }: { text?: string }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 60, gap: 12, color: '#6b7280'
    }}>
      <Loader2 size={28} style={{ animation: 'spin 1s linear infinite' }} />
      <span style={{ fontSize: 14 }}>{text}</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export function PageLoading() {
  return (
    <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 120px)' }}>
      <Loading text="Sahifa yuklanmoqda..." />
    </div>
  )
}
