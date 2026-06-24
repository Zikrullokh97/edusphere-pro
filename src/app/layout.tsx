import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Providers from '@/components/layout/Providers'

export const metadata: Metadata = {
  title: 'EduSphere Pro — Smart School Ecosystem',
  description: 'Markaziy Osiyo maktablari uchun zamonaviy boshqaruv tizimi',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  )
}
