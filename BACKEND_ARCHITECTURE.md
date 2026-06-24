# EduSphere Pro — Backend Architecture

## 1. Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js 20+ |
| Framework | NestJS 10 |
| Language | TypeScript 5 |
| Database | PostgreSQL 15+ |
| ORM | Prisma 5 |
| Auth | JWT (access + refresh tokens) |
| Validation | class-validator + class-transformer |
| Security | bcrypt, helmet, cors |
| Documentation | Swagger/OpenAPI |

---

## 2. Folder Structure

```
backend/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── refresh.strategy.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── permissions.guard.ts
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       ├── register.dto.ts
│   │       └── refresh-token.dto.ts
│   │
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   └── dto/
│   │
│   ├── schools/
│   │   ├── schools.controller.ts
│   │   ├── schools.service.ts
│   │   ├── schools.module.ts
│   │   └── dto/
│   │
│   ├── staff/
│   │   ├── staff.controller.ts
│   │   ├── staff.service.ts
│   │   ├── staff.module.ts
│   │   └── dto/
│   │
│   ├── students/
│   │   ├── students.controller.ts
│   │   ├── students.service.ts
│   │   ├── students.module.ts
│   │   └── dto/
│   │
│   ├── parents/
│   │   ├── parents.controller.ts
│   │   ├── parents.service.ts
│   │   ├── parents.module.ts
│   │   └── dto/
│   │
│   ├── classes/
│   │   ├── classes.controller.ts
│   │   ├── classes.service.ts
│   │   ├── classes.module.ts
│   │   └── dto/
│   │
│   ├── schedule/
│   │   ├── schedule.controller.ts
│   │   ├── schedule.service.ts
│   │   ├── schedule.module.ts
│   │   └── dto/
│   │
│   ├── exams/
│   │   ├── exams.controller.ts
│   │   ├── exams.service.ts
│   │   ├── exams.module.ts
│   │   └── dto/
│   │
│   ├── finance/
│   │   ├── finance.controller.ts
│   │   ├── finance.service.ts
│   │   ├── finance.module.ts
│   │   └── dto/
│   │
│   ├── hr/
│   │   ├── hr.controller.ts
│   │   ├── hr.service.ts
│   │   ├── hr.module.ts
│   │   └── dto/
│   │
│   ├── salary/
│   │   ├── salary.controller.ts
│   │   ├── salary.service.ts
│   │   ├── salary.module.ts
│   │   └── dto/
│   │
│   ├── documents/
│   │   ├── documents.controller.ts
│   │   ├── documents.service.ts
│   │   ├── documents.module.ts
│   │   └── dto/
│   │
│   ├── reports/
│   │   ├── reports.controller.ts
│   │   ├── reports.service.ts
│   │   ├── reports.module.ts
│   │   └── dto/
│   │
│   ├── events/
│   │   ├── events.controller.ts
│   │   ├── events.service.ts
│   │   ├── events.module.ts
│   │   └── dto/
│   │
│   ├── discipline/
│   │   ├── discipline.controller.ts
│   │   ├── discipline.service.ts
│   │   ├── discipline.module.ts
│   │   └── dto/
│   │
│   ├── psycho/
│   │   ├── psycho.controller.ts
│   │   ├── psycho.service.ts
│   │   ├── psycho.module.ts
│   │   └── dto/
│   │
│   ├── sport/
│   │   ├── sport.controller.ts
│   │   ├── sport.service.ts
│   │   ├── sport.module.ts
│   │   └── dto/
│   │
│   ├── workload/
│   │   ├── workload.controller.ts
│   │   ├── workload.service.ts
│   │   ├── workload.module.ts
│   │   └── dto/
│   │
│   ├── common/
│   │   ├── filters/
│   │   │   ├── http-exception.filter.ts
│   │   │   └── prisma-exception.filter.ts
│   │   ├── interceptors/
│   │   │   ├── transform.interceptor.ts
│   │   │   └── timeout.interceptor.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   └── guards/
│   │
│   ├── config/
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   └── app.config.ts
│   │
│   └── main.ts
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── test/
│   ├── auth.e2e-spec.ts
│   └── users.e2e-spec.ts
│
├── package.json
├── tsconfig.json
├── nest-cli.json
└── .env.example
```

---

## 3. Database Entities (Prisma Schema)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Enums ───────────────────────────────────────────────────────────────────

enum UserRole {
  SUPER_ADMIN
  SCHOOL_ADMIN
  TEACHER
  PARENT
  STUDENT
  DISTRICT_ADMIN
  MINISTRY_ADMIN
}

enum UserStatus {
  ACTIVE
  INACTIVE
  ON_LEAVE
}

enum PaymentStatus {
  PAID
  PENDING
  OVERDUE
}

enum Gender {
  MALE
  FEMALE
}

enum ExamStatus {
  SCHEDULED
  DONE
  CANCELLED
}

enum EventStatus {
  UPCOMING
  TODAY
  PREPARING
  DONE
}

enum DisciplineStatus {
  NEW
  IN_PROGRESS
  RESOLVED
}

enum PsychoResult {
  IMPROVING
  MONITORING
  ADAPTING
  DONE
}

enum ParentContactStatus {
  PENDING
  SEEN
  REPLIED
  NO_REPLY
}

enum SportPlace {
  FIRST
  SECOND
  THIRD
  PARTICIPANT
}

enum WorkloadStatus {
  NORMAL
  HEAVY
  OVERLOADED
}

// ─── Core Entities ────────────────────────────────────────────────────────────

model School {
  id          String   @id @default(uuid())
  name        String
  address     String
  phone       String?
  email       String?
  district    String?
  region      String?
  foundedYear Int?
  directorId  String?
  director    User?    @relation("SchoolDirector", fields: [directorId], references: [id])
  users       User[]
  classes     Class[]
  staff       Staff[]
  students    Student[]
  events      SchoolEvent[]
  documents   Document[]
  payments    Payment[]
  expenses    Expense[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("schools")
}

model User {
  id           String    @id @default(uuid())
  email        String    @unique
  password     String
  fullName     String
  phone        String?
  avatar       String?
  role         UserRole
  status       UserStatus @default(ACTIVE)
  schoolId     String?
  school       School?   @relation(fields: [schoolId], references: [id])
  refreshToken String?
  lastLogin    DateTime?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  // Relations
  staffProfile    Staff?
  studentProfile  Student?
  parentProfile   Parent?
  createdDocuments Document[] @relation("DocumentCreatedBy")
  signedDocuments  Document[] @relation("DocumentSignedBy")
  psychoSessions   PsychoSession[]
  responsibleEvents SchoolEvent[]
  disciplineActions  DisciplineRecord[] @relation("DisciplineHandledBy")
  examRecords      Exam[] @relation("ExamCreatedBy")

  @@map("users")
}

model Staff {
  id           String  @id @default(uuid())
  userId       String  @unique
  user         User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  schoolId     String
  school       School  @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  position     String
  subject      String?
  phone        String
  joinedYear   Int
  salaryBase   Float
  status       UserStatus @default(ACTIVE)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  // Relations
  workload     TeacherWorkload?
  lessons      Lesson[]
  exams        Exam[]
  salaryRecords SalaryRecord[]

  @@map("staff")
}

model Student {
  id             String    @id @default(uuid())
  userId         String    @unique
  user           User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  schoolId       String
  school         School    @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  classId        String
  class          Class     @relation(fields: [classId], references: [id])
  fullName       String
  gender         Gender
  birthDate      DateTime
  address        String?
  phone          String?
  parentId       String?
  parent         Parent?   @relation(fields: [parentId], references: [id])
  attendanceRate Float?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt

  // Relations
  disciplineRecords DisciplineRecord[]
  psychoSessions    PsychoSession[]
  examResults       ExamResult[]

  @@map("students")
}

model Parent {
  id           String  @id @default(uuid())
  userId       String  @unique
  user         User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  schoolId     String
  school       School  @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  fullName     String
  phone        String
  occupation   String?
  students     Student[]
  contacts     ParentContact[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@map("parents")
}

// ─── Academic Entities ────────────────────────────────────────────────────────

model Class {
  id            String    @id @default(uuid())
  schoolId      String
  school        School    @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  name          String
  room          String
  classTeacher  String
  studentCount  Int       @default(0)
  boys          Int       @default(0)
  girls         Int       @default(0)
  attendanceRate Float?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  students Student[]
  lessons  Lesson[]

  @@unique([schoolId, name])
  @@map("classes")
}

model Lesson {
  id          String  @id @default(uuid())
  classId     String
  class       Class   @relation(fields: [classId], references: [id], onDelete: Cascade)
  subject     String
  teacher     String
  teacherShort String
  day         Int     // 0-4 (Mon-Fri)
  period      Int     // 1-7
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([classId, day, period])
  @@map("lessons")
}

model Exam {
  id           String    @id @default(uuid())
  date         DateTime
  classes      String[]  // Array of class IDs
  subject      String
  teacher      String
  room         String
  durationMin  Int
  status       ExamStatus @default(SCHEDULED)
  createdById  String
  createdBy    User      @relation("ExamCreatedBy", fields: [createdById], references: [id])
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  @@map("exams")
}

model ExamResult {
  id        String  @id @default(uuid())
  examId    String
  exam      Exam    @relation(fields: [examId], references: [id], onDelete: Cascade)
  studentId String
  student   Student @relation(fields: [studentId], references: [id], onDelete: Cascade)
  grade     Int?
  createdAt DateTime @default(now())

  @@map("exam_results")
}

// ─── Finance Entities ─────────────────────────────────────────────────────────

model Payment {
  id          String       @id @default(uuid())
  schoolId    String
  school      School       @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  studentName String
  className   String
  type        String
  amount      Float
  status      PaymentStatus @default(PENDING)
  date        DateTime
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  @@map("payments")
}

model Expense {
  id        String   @id @default(uuid())
  schoolId  String
  school    School   @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  category  String
  amount    Float
  date      DateTime
  note      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("expenses")
}

model SalaryRecord {
  id         String  @id @default(uuid())
  staffId    String
  staff      Staff   @relation(fields: [staffId], references: [id], onDelete: Cascade)
  staffName  String
  position   String
  workDays   Int
  totalDays  Int
  lessonHours Float?
  baseSalary Float
  bonus      Float
  total      Float
  status     PaymentStatus @default(PENDING)
  month      String  // Format: "2024-01"
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("salary_records")
}

// ─── HR & Workload ────────────────────────────────────────────────────────────

model TeacherWorkload {
  id          String        @id @default(uuid())
  staffId     String        @unique
  staff       Staff         @relation(fields: [staffId], references: [id], onDelete: Cascade)
  name        String
  subject     String
  weeklyHours Int
  maxHours    Int
  status      WorkloadStatus @default(NORMAL)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  @@map("teacher_workloads")
}

// ─── Documents ────────────────────────────────────────────────────────────────

model Document {
  id         String    @id @default(uuid())
  schoolId   String
  school     School    @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  number     Int
  title      String
  date       DateTime
  signed     Boolean   @default(false)
  signedById String?
  signedBy   User?     @relation("DocumentSignedBy", fields: [signedById], references: [id])
  createdById String
  createdBy  User      @relation("DocumentCreatedBy", fields: [createdById], references: [id])
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  @@map("documents")
}

// ─── Tarbiyaviy (Events) ──────────────────────────────────────────────────────

model SchoolEvent {
  id           String      @id @default(uuid())
  schoolId     String
  school       School      @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  title        String
  date         DateTime
  day          Int
  month        String
  time         String
  location     String
  responsible  String
  grades       String?
  status       EventStatus @default(UPCOMING)
  createdById  String?
  createdBy    User?       @relation("ResponsibleEvents", fields: [createdById], references: [id])
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt

  @@map("school_events")
}

// ─── Discipline ───────────────────────────────────────────────────────────────

model DisciplineRecord {
  id           String           @id @default(uuid())
  studentId    String
  student      Student          @relation(fields: [studentId], references: [id], onDelete: Cascade)
  studentName  String
  className    String
  incident     String
  date         DateTime
  action       String
  status       DisciplineStatus @default(NEW)
  handledById  String?
  handledBy    User?            @relation("DisciplineHandledBy", fields: [handledById], references: [id])
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt

  @@map("discipline_records")
}

// ─── Psychology ───────────────────────────────────────────────────────────────

model PsychoSession {
  id            String        @id @default(uuid())
  studentId     String
  student       Student       @relation(fields: [studentId], references: [id], onDelete: Cascade)
  studentName   String
  className     String
  sessionDate   DateTime
  psychologist  String
  result        PsychoResult  @default(MONITORING)
  nextSession   DateTime?
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  @@map("psycho_sessions")
}

// ─── Sport ────────────────────────────────────────────────────────────────────

model SportSection {
  id            String  @id @default(uuid())
  schoolId      String
  school        School  @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  name          String
  schedule      String
  responsible   String
  studentCount  Int
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@map("sport_sections")
}

model SportAchievement {
  id        String     @id @default(uuid())
  schoolId  String
  school    School     @relation(fields: [schoolId], references: [id], onDelete: Cascade)
  title     String
  date      DateTime
  place     SportPlace
  createdAt DateTime   @default(now())

  @@map("sport_achievements")
}

// ─── Parents ──────────────────────────────────────────────────────────────────

model ParentContact {
  id           String             @id @default(uuid())
  parentId     String
  parent       Parent             @relation(fields: [parentId], references: [id], onDelete: Cascade)
  parentName   String
  childName    String
  className    String
  lastContact  DateTime
  status       ParentContactStatus @default(PENDING)
  createdAt    DateTime           @default(now())
  updatedAt    DateTime           @updatedAt

  @@map("parent_contacts")
}
```

---

## 4. API Modules & Endpoints

### 4.1 Authentication (`/api/auth`)
```
POST   /api/auth/login              # Login with email + password
POST   /api/auth/refresh           # Refresh access token
POST   /api/auth/logout            # Invalidate refresh token
POST   /api/auth/register          # Register new user (Super Admin only)
GET    /api/auth/me                # Get current user profile
```

### 4.2 Users (`/api/users`)
```
GET    /api/users                  # List users (filtered by role/school)
GET    /api/users/:id              # Get user by ID
PATCH  /api/users/:id              # Update user
DELETE /api/users/:id              # Delete user
```

### 4.3 Schools (`/api/schools`)
```
GET    /api/schools                # List schools (Ministry/District Admin)
GET    /api/schools/:id            # Get school details
POST   /api/schools                # Create school (Ministry Admin)
PATCH  /api/schools/:id            # Update school
DELETE /api/schools/:id            # Delete school
```

### 4.4 Staff / HR (`/api/staff`)
```
GET    /api/staff                  # List staff (with position filter)
GET    /api/staff/:id              # Get staff details
POST   /api/staff                  # Create staff member
PATCH  /api/staff/:id              # Update staff
DELETE /api/staff/:id              # Delete staff
```

### 4.5 Salary (`/api/salary`)
```
GET    /api/salary                 # Get salary records (by month)
POST   /api/salary/:id/pay         # Mark salary as paid
POST   /api/salary/pay-all         # Pay all salaries for month
GET    /api/salary/export          # Export to Excel
```

### 4.6 Finance (`/api/finance`)
```
GET    /api/finance/payments       # List payments
POST   /api/finance/payments       # Create payment
GET    /api/finance/expenses       # List expenses
POST   /api/finance/expenses       # Create expense
GET    /api/finance/report         # Monthly finance report
GET    /api/finance/export/pdf     # Export report PDF
GET    /api/finance/export/excel   # Export report Excel
```

### 4.7 Classes (`/api/classes`)
```
GET    /api/classes                # List classes
GET    /api/classes/:id            # Get class details
POST   /api/classes                # Create class
PATCH  /api/classes/:id            # Update class
DELETE /api/classes/:id            # Delete class
```

### 4.8 Schedule (`/api/schedule`)
```
GET    /api/schedule               # Get schedule (by class_id)
PUT    /api/schedule               # Update schedule (bulk lessons)
```

### 4.9 Exams (`/api/exams`)
```
GET    /api/exams                  # List exams
POST   /api/exams                  # Create exam
PATCH  /api/exams/:id              # Update exam
DELETE /api/exams/:id              # Delete exam
```

### 4.10 Documents (`/api/documents`)
```
GET    /api/documents              # List documents
POST   /api/documents              # Create document
POST   /api/documents/:id/sign     # Sign document
```

### 4.11 Parents (`/api/parents`)
```
GET    /api/parents                # List parent contacts
POST   /api/parents/bulk-message   # Send bulk message
POST   /api/parents/:id/message    # Send message to parent
```

### 4.12 Reports (`/api/reports`)
```
GET    /api/reports/attendance/:format  # Attendance report (pdf/excel)
GET    /api/reports/finance/:format     # Finance report (pdf/excel)
GET    /api/reports/staff/:format       # Staff report (pdf/excel)
```

### 4.13 Events (`/api/events`)
```
GET    /api/events                 # List events
POST   /api/events                 # Create event
PATCH  /api/events/:id             # Update event
DELETE /api/events/:id             # Delete event
```

### 4.14 Discipline (`/api/discipline`)
```
GET    /api/discipline             # List discipline records
POST   /api/discipline             # Create record
PATCH  /api/discipline/:id         # Resolve/update record
```

### 4.15 Psychology (`/api/psycho`)
```
GET    /api/psycho/sessions        # List psycho sessions
POST   /api/psycho/sessions        # Create session
PATCH  /api/psycho/sessions/:id    # Update session
```

### 4.16 Sport (`/api/sport`)
```
GET    /api/sport/sections         # List sport sections
GET    /api/sport/achievements     # List achievements
POST   /api/sport/sections         # Create section
POST   /api/sport/achievements     # Add achievement
```

### 4.17 Workload (`/api/workload`)
```
GET    /api/workload               # List teacher workloads
```

### 4.18 Dashboard (`/api/dashboard`)
```
GET    /api/dashboard/stats        # Dashboard statistics
```

---

## 5. Authentication Flow

### 5.1 JWT Strategy
```
Access Token  : 15 minutes expiry
Refresh Token : 7 days expiry (stored in DB + HttpOnly cookie)
```

### 5.2 Login Flow
```
1. Client sends POST /api/auth/login { email, password }
2. Server validates credentials
3. Server generates:
   - Access token (JWT, contains: userId, role, schoolId)
   - Refresh token (random string, stored hashed in DB)
4. Server returns:
   {
     "access_token": "...",
     "refresh_token": "...",
     "user": { id, email, fullName, role, schoolId }
   }
5. Client stores:
   - access_token in localStorage (as currently implemented)
   - refresh_token in HttpOnly cookie (for security)
```

### 5.3 Token Refresh Flow
```
1. Client sends POST /api/auth/refresh with HttpOnly cookie
2. Server validates refresh token from cookie
3. Server issues new access token
4. Client updates localStorage
```

### 5.4 Protected Route Flow
```
1. Client sends request with Authorization: Bearer <access_token>
2. JWT Strategy validates token
3. Roles Guard checks user role against required roles
4. Request proceeds or returns 403
```

### 5.5 Logout Flow
```
1. Client sends POST /api/auth/logout
2. Server removes refresh token from DB
3. Server clears HttpOnly cookie
4. Client removes access_token from localStorage
```

---

## 6. Role-Based Access Control (RBAC)

### 6.1 Role Hierarchy & Permissions

| Role | Scope | Key Permissions |
|------|-------|-----------------|
| **Super Admin** | Global | Full system access, manage all schools, manage all users |
| **Ministry Admin** | National | View all schools, create/edit schools, national reports |
| **District Admin** | District | View schools in district, district reports |
| **School Admin** | Single School | Full school management, manage staff/students, all school modules |
| **Teacher** | Own Classes | View own classes, input grades/attendance, view schedule |
| **Parent** | Own Children | View child's data, communicate with teachers |
| **Student** | Own Data | View own schedule, grades, exams |

### 6.2 Guard Implementation

```typescript
// Example: Roles Guard
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return requiredRoles.some((role) => user.role === role);
  }
}

// Usage in controller
@Get('stats')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('school_admin', 'super_admin', 'ministry_admin')
getDashboardStats() {
  return this.dashboardService.getStats();
}
```

### 6.3 Data Scoping
- **School-level data**: All queries filtered by `schoolId` from JWT
- **Ministry/District**: Can query across multiple schools
- **Teacher/Parent/Student**: Can only access their own related data

---

## 7. Integration with Next.js Frontend

### 7.1 API Contract Alignment
The frontend `src/lib/api/services.ts` already defines endpoints. Backend must match:

| Frontend Service | Backend Endpoint | Method |
|------------------|------------------|--------|
| `dashboardApi.getStats()` | `/api/dashboard/stats` | GET |
| `hrApi.getAll()` | `/api/staff` | GET |
| `hrApi.create()` | `/api/staff` | POST |
| `salaryApi.getMonth()` | `/api/salary` | GET |
| `financeApi.getPayments()` | `/api/finance/payments` | GET |
| `scheduleApi.getByClass()` | `/api/schedule` | GET |
| `examsApi.getAll()` | `/api/exams` | GET |
| `documentsApi.getAll()` | `/api/documents` | GET |
| `parentsApi.getAll()` | `/api/parents` | GET |
| `reportsApi.attendance()` | `/api/reports/attendance/:format` | GET |
| `eventsApi.getAll()` | `/api/events` | GET |
| `disciplineApi.getAll()` | `/api/discipline` | GET |
| `psychoApi.getAll()` | `/api/psycho/sessions` | GET |
| `sportApi.getSections()` | `/api/sport/sections` | GET |

### 7.2 CORS Configuration
```typescript
// backend/src/main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });
  // ...
}
```

### 7.3 Response Format
All responses follow this envelope:
```json
{
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

Error responses:
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Invalid token"
}
```

### 7.4 Frontend Environment Variables
```env
# .env.local (Next.js)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 7.5 Authentication Integration
The frontend already implements:
- `localStorage` for access token
- Axios interceptor for `Authorization` header
- 401 redirect to `/login`

Backend must support this exact flow. The refresh token should be stored in an HttpOnly cookie to prevent XSS.

---

## 8. Key Design Decisions

### 8.1 Multi-Tenancy
- **School-level isolation**: All data scoped by `schoolId`
- **Shared database**: Single PostgreSQL database with `schoolId` foreign keys
- **Row-level security**: Prisma middleware or SQL policies for data isolation

### 8.2 Soft Deletes
- Use `deletedAt` timestamp for critical entities
- Preserve audit trail for financial and academic records

### 8.3 Audit Logging
- Track all CRUD operations with `userId`, `action`, `timestamp`
- Separate `audit_logs` table for compliance

### 8.4 File Uploads
- Store documents in local filesystem or S3-compatible storage
- Presigned URLs for large file uploads

### 8.5 Background Jobs
- Use `@nestjs/schedule` for:
  - Monthly salary calculations
  - Report generation
  - Notification reminders

---

## 9. Development Phases

### Phase 1: Core Infrastructure
- [ ] NestJS project setup
- [ ] Prisma schema + migrations
- [ ] JWT authentication module
- [ ] RBAC guards & decorators
- [ ] Global exception filters
- [ ] Swagger documentation

### Phase 2: Core Entities
- [ ] Users module (with roles)
- [ ] Schools module
- [ ] Staff module
- [ ] Students module
- [ ] Parents module
- [ ] Classes module

### Phase 3: Academic Modules
- [ ] Schedule module
- [ ] Exams module
- [ ] Workload module

### Phase 4: Finance & HR
- [ ] Finance module (payments, expenses)
- [ ] HR module (staff management)
- [ ] Salary module

### Phase 5: Support Modules
- [ ] Documents module
- [ ] Events module
- [ ] Discipline module
- [ ] Psychology module
- [ ] Sport module
- [ ] Parents module (messaging)
- [ ] Reports module (PDF/Excel export)

### Phase 6: Integration & Testing
- [ ] E2E tests for all endpoints
- [ ] Integration with Next.js frontend
- [ ] Load testing
- [ ] Security audit

---

## 10. Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/edusphere"

# JWT
JWT_SECRET="super-secret-key-change-in-production"
JWT_REFRESH_SECRET="refresh-secret-key-change-in-production"
JWT_EXPIRY="15m"
JWT_REFRESH_EXPIRY="7d"

# App
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Uploads
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760
```

---

## 11. Seed Data Strategy

```typescript
// prisma/seed.ts
async function main() {
  // Create Super Admin
  await prisma.user.create({
    data: {
      email: 'admin@edusphere.uz',
      password: await bcrypt.hash('admin123', 10),
      fullName: 'Super Admin',
      role: 'SUPER_ADMIN',
    },
  });

  // Create demo school
  const school = await prisma.school.create({
    data: {
      name: 'Demo School',
      address: 'Tashkent, Uzbekistan',
      district: 'Yunusabad',
      region: 'Tashkent',
    },
  });

  // Create School Admin
  await prisma.user.create({
    data: {
      email: 'admin@school.uz',
      password: await bcrypt.hash('admin123', 10),
      fullName: 'School Admin',
      role: 'SCHOOL_ADMIN',
      schoolId: school.id,
    },
  });
}
```

---

## 12. Monitoring & Observability

- **Logging**: Winston + Morgan
- **Metrics**: Prometheus + Grafana
- **Health Checks**: `/api/health` endpoint
- **Request Tracing**: Correlation IDs for distributed tracing

---

## Summary

This architecture provides:
1. **Scalable** NestJS backend with modular structure
2. **Type-safe** Prisma ORM with PostgreSQL
3. **Secure** JWT authentication with RBAC
4. **Compatible** API contract matching the existing Next.js frontend
5. **Multi-tenant** school-level data isolation
6. **Extensible** design for future modules

The backend is designed to be a drop-in replacement for the mock data currently used in the frontend, requiring zero changes to the Next.js application beyond updating the API base URL.