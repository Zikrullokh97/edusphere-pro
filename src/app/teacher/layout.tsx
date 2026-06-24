import TeacherSidebar from '@/components/teacher/TeacherSidebar'
import TeacherTopbar from '@/components/teacher/TeacherTopbar'

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: '#f0f2f5' }}>
      <TeacherSidebar />
      <div style={{ marginLeft: 220, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TeacherTopbar />
        <main style={{ flex: 1, padding: '20px 24px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
