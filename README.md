# EduSphere Pro — Teacher Dashboard

## Tech Stack
- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Backend**: FastAPI (Python) — alohida server
- **State**: Zustand + React Query (TanStack Query v5)
- **Styling**: Tailwind CSS + Custom CSS (globals.css)
- **UI**: Lucide React icons
- **HTTP**: Axios (JWT interceptors bilan)

## Papka tuzilmasi

```
src/
├── app/
│   ├── dashboard/          # Direktor + Zavuch paneli
│   │   ├── layout.tsx      # Sidebar + Topbar layout
│   │   ├── hr/             # Xodimlar (HR)
│   │   ├── salary/         # Ish haqi
│   │   ├── finance/        # Moliya
│   │   ├── docs/           # Hujjatlar
│   │   ├── parents/        # Ota-onalar
│   │   ├── reports/        # Davlat hisobotlari
│   │   ├── schedule/       # Dars jadvali (Zavuch)
│   │   ├── workload/       # O'qituvchi yuklamasi
│   │   ├── classes/        # Sinflar
│   │   ├── exams/          # Imtihon jadvali
│   │   ├── methodical/     # Metodik ishlar
│   │   ├── events/         # Tadbirlar
│   │   ├── discipline/     # Intizom
│   │   ├── psycho/         # Psixolog
│   │   └── sport/          # Sport
│   │
│   └── teacher/            # O'qituvchi paneli
│       ├── layout.tsx      # Teacher Sidebar + Topbar
│       ├── page.tsx        # Teacher Dashboard
│       ├── attendance/     # Davomat (Face ID + manual + SMS)
│       ├── grades/         # Baholash (AI ovoz orqali)
│       ├── schedule/       # Dars jadvali + mavzu + vazifa
│       ├── materials/      # Fayllar + AI test + Online dars
│       └── chat/           # Ota-ona chat + ommaviy xabar
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx     # Director/Zavuch sidebar
│   │   ├── Topbar.tsx      # Director/Zavuch topbar
│   │   └── Providers.tsx   # React Query provider
│   └── teacher/
│       ├── TeacherSidebar.tsx
│       └── TeacherTopbar.tsx
│
└── lib/
    ├── api/
    │   ├── client.ts       # Axios + JWT interceptors
    │   └── services.ts     # Barcha API endpoint funksiyalar
    ├── hooks/
    │   ├── index.ts        # Director/Zavuch React Query hooks
    │   └── teacher.ts      # Teacher React Query hooks
    └── types/
        └── index.ts        # TypeScript type definitionlar
```

## O'rnatish

```bash
# 1. Dependencies
npm install

# 2. Env
cp .env.local.example .env.local
# NEXT_PUBLIC_API_URL ni FastAPI server URL ga o'zgartiring

# 3. Run
npm run dev
```

## URL yo'llari

| URL | Panel |
|-----|-------|
| `/dashboard` | Direktor dashboard |
| `/dashboard/hr` | Xodimlar (HR) |
| `/dashboard/salary` | Ish haqi |
| `/dashboard/finance` | Moliya |
| `/dashboard/schedule` | Dars jadvali (Zavuch) |
| `/dashboard/events` | Tadbirlar |
| `/dashboard/discipline` | Intizom |
| `/dashboard/psycho` | Psixolog |
| `/teacher` | O'qituvchi dashboard |
| `/teacher/attendance` | Davomat |
| `/teacher/grades` | Baholash (AI ovoz) |
| `/teacher/schedule` | Dars jadvali |
| `/teacher/materials` | Dars materiallari |
| `/teacher/chat` | Muloqot |

## FastAPI Backend endpoints kerak bo'ladi

```
POST /api/teacher/attendance       — Davomatni saqlash
POST /api/teacher/face-id          — Face ID orqali tanish
POST /api/teacher/sms              — SMS yuborish
GET  /api/teacher/grades           — Baholarni olish
POST /api/teacher/grades           — Baholarni saqlash
POST /api/teacher/voice-grades     — AI: ovozdan baholarni parse qilish
POST /api/teacher/ai-test          — AI: test yaratish (Anthropic Claude)
GET  /api/teacher/materials        — Fayllar ro'yxati
POST /api/teacher/materials        — Fayl yuklash
GET  /api/teacher/chat/{parent_id} — Xabarlar tarixi
POST /api/teacher/chat/{parent_id} — Xabar yuborish
POST /api/teacher/broadcast        — Ommaviy xabar
```

## Branding
- Navy: `#003366`
- Gold: `#C9A227`
- Font: Inter
