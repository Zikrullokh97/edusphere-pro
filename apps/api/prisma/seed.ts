import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@edusphere.uz' },
    update: {},
    create: {
      email: 'admin@edusphere.uz',
      password: await bcrypt.hash('admin123', 10),
      fullName: 'Super Admin',
      role: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
    },
  });
  console.log('✅ Super Admin created:', superAdmin.email);

  // Create demo school
  const school = await prisma.school.upsert({
    where: { id: 'demo-school-id' },
    update: {},
    create: {
      id: 'demo-school-id',
      name: 'Demo School',
      address: 'Tashkent, Uzbekistan',
      district: 'Yunusabad',
      region: 'Tashkent',
      phone: '+998 90 123 45 67',
      email: 'info@demoschool.uz',
    },
  });
  console.log('✅ Demo school created:', school.name);

  // Create School Admin
  const schoolAdmin = await prisma.user.upsert({
    where: { email: 'admin@school.uz' },
    update: {},
    create: {
      email: 'admin@school.uz',
      password: await bcrypt.hash('admin123', 10),
      fullName: 'School Admin',
      role: UserRole.SCHOOL_ADMIN,
      status: UserStatus.ACTIVE,
      schoolId: school.id,
    },
  });
  console.log('✅ School Admin created:', schoolAdmin.email);

  // Create demo teacher
  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@school.uz' },
    update: {},
    create: {
      email: 'teacher@school.uz',
      password: await bcrypt.hash('teacher123', 10),
      fullName: 'John Doe',
      role: UserRole.TEACHER,
      status: UserStatus.ACTIVE,
      schoolId: school.id,
    },
  });
  console.log('✅ Teacher created:', teacherUser.email);

  // Create teacher profile
  await prisma.staff.upsert({
    where: { userId: teacherUser.id },
    update: {},
    create: {
      userId: teacherUser.id,
      schoolId: school.id,
      position: 'Teacher',
      subject: 'Mathematics',
      phone: '+998 90 123 45 68',
      joinedYear: 2020,
      salaryBase: 5000000,
      status: UserStatus.ACTIVE,
    },
  });

  // Create demo class
  const class10A = await prisma.class.upsert({
    where: { id: 'class-10a-id' },
    update: {},
    create: {
      id: 'class-10a-id',
      schoolId: school.id,
      name: '10-A',
      room: '101',
      classTeacher: 'John Doe',
      studentCount: 25,
      boys: 13,
      girls: 12,
      attendanceRate: 95.5,
    },
  });
  console.log('✅ Demo class created:', class10A.name);

  // Create demo student
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@school.uz' },
    update: {},
    create: {
      email: 'student@school.uz',
      password: await bcrypt.hash('student123', 10),
      fullName: 'Jane Smith',
      role: UserRole.STUDENT,
      status: UserStatus.ACTIVE,
      schoolId: school.id,
    },
  });

  await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      schoolId: school.id,
      classId: class10A.id,
      fullName: 'Jane Smith',
      gender: 'FEMALE',
      birthDate: new Date('2008-05-15'),
      address: 'Tashkent, Uzbekistan',
      phone: '+998 90 123 45 69',
      attendanceRate: 96.0,
    },
  });
  console.log('✅ Demo student created:', studentUser.email);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });