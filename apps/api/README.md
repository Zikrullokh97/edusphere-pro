# EduSphere Pro API

NestJS backend for the EduSphere Pro school management system.

## Tech Stack

- **Framework**: NestJS 10
- **Language**: TypeScript 5
- **Database**: PostgreSQL 15+
- **ORM**: Prisma 5
- **Auth**: JWT (access + refresh tokens)
- **Validation**: class-validator + class-transformer

## Project Structure

```
apps/api/
├── src/
│   ├── auth/              # Authentication & authorization
│   ├── users/             # User management
│   ├── schools/           # School management
│   ├── prisma/            # Prisma service & module
│   ├── common/            # Shared filters, interceptors, guards
│   └── main.ts            # Application entry point
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Database seeder
├── package.json
├── tsconfig.json
└── .env.example
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm or yarn

### Installation

1. Install dependencies:
```bash
cd apps/api
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials and JWT secrets
```

3. Generate Prisma client:
```bash
npm run prisma:generate
```

4. Run database migrations:
```bash
npm run prisma:migrate
```

5. Seed the database (optional):
```bash
npm run prisma:seed
```

6. Start the development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:8000/api`

## API Documentation

Once running, access Swagger documentation at:
`http://localhost:8000/api/docs`

## Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed database
- `npm run prisma:studio` - Open Prisma Studio
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests

## Environment Variables

See `.env.example` for all available configuration options.

## Authentication

The API uses JWT-based authentication:

1. **Login**: `POST /api/auth/login`
   ```json
   {
     "email": "admin@edusphere.uz",
     "password": "admin123"
   }
   ```

2. **Response**:
   ```json
   {
     "access_token": "...",
     "refresh_token": "...",
     "user": { ... }
   }
   ```

3. **Use token**: Include in Authorization header
   ```
   Authorization: Bearer <access_token>
   ```

## Role-Based Access Control

Available roles:
- `SUPER_ADMIN` - Full system access
- `MINISTRY_ADMIN` - National level access
- `DISTRICT_ADMIN` - District level access
- `SCHOOL_ADMIN` - School level access
- `TEACHER` - Teacher access
- `PARENT` - Parent access
- `STUDENT` - Student access

Use the `@Roles()` decorator to protect endpoints:
```typescript
@Get('stats')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('school_admin', 'super_admin')
getStats() {
  return this.dashboardService.getStats();
}
```

## License

Private - EduSphere Pro