import type {
  Staff, SalaryRecord, Payment, Expense, SchoolClass,
  Lesson, TeacherWorkload, Exam, Document,
  ParentContact, SchoolEvent, DisciplineRecord,
  PsychoSession, SportSection, SportAchievement, DashboardStats
} from '@/lib/types'

export const mockStaff: Staff[] = [
  { id: '1', full_name: 'Aziz Karimov', initials: 'AK', position: 'Direktor', phone: '+998 90 123 45 67', joined_year: 2010, status: 'active', salary_base: 8500000 },
  { id: '2', full_name: 'Dilnoza Rahimova', initials: 'DR', position: "O'quv ishlari (Zavuch)", phone: '+998 91 234 56 78', joined_year: 2012, status: 'active', salary_base: 6500000 },
  { id: '3', full_name: 'Sherzod Aliyev', initials: 'SA', position: 'Matematika o\'qituvchisi', subject: 'Matematika', phone: '+998 93 345 67 89', joined_year: 2015, status: 'active', salary_base: 4500000 },
  { id: '4', full_name: 'Gulnora Abdurahmonova', initials: 'GA', position: 'Fizika o\'qituvchisi', subject: 'Fizika', phone: '+998 94 456 78 90', joined_year: 2014, status: 'active', salary_base: 4200000 },
  { id: '5', full_name: 'Bekzod Toshmatov', initials: 'BT', position: 'Ingliz tili o\'qituvchisi', subject: 'Ingliz tili', phone: '+998 95 567 89 01', joined_year: 2018, status: 'active', salary_base: 4800000 },
  { id: '6', full_name: 'Nargiza Usmanova', initials: 'NU', position: 'Ona tili o\'qituvchisi', subject: 'Ona tili', phone: '+998 97 678 90 12', joined_year: 2016, status: 'active', salary_base: 4100000 },
  { id: '7', full_name: 'Rustam Xolmurodov', initials: 'RX', position: 'Tarix o\'qituvchisi', subject: 'Tarix', phone: '+998 98 789 01 23', joined_year: 2017, status: 'active', salary_base: 4000000 },
  { id: '8', full_name: 'Lola Qodirova', initials: 'LQ', position: 'Kimyo o\'qituvchisi', subject: 'Kimyo', phone: '+998 90 890 12 34', joined_year: 2019, status: 'active', salary_base: 4300000 },
  { id: '9', full_name: 'Jasur Nazarov', initials: 'JN', position: 'Psixolog', phone: '+998 91 901 23 45', joined_year: 2020, status: 'active', salary_base: 3800000 },
  { id: '10', full_name: 'Matluba Ergasheva', initials: 'ME', position: 'Boshlang\'ich sinf o\'qituvchisi', subject: 'Boshlang\'ich ta\'lim', phone: '+998 93 012 34 56', joined_year: 2013, status: 'active', salary_base: 3900000 },
  { id: '11', full_name: 'Oybek Sultonov', initials: 'OS', position: 'Jismoniy tarbiya o\'qituvchisi', subject: 'Jismoniy tarbiya', phone: '+998 94 123 45 67', joined_year: 2021, status: 'active', salary_base: 3700000 },
  { id: '12', full_name: 'Zulfiya Hakimova', initials: 'ZH', position: 'Geografiya o\'qituvchisi', subject: 'Geografiya', phone: '+998 95 234 56 78', joined_year: 2018, status: 'inactive', salary_base: 4000000 },
  { id: '13', full_name: 'Furqat Abdullayev', initials: 'FA', position: 'IT o\'qituvchisi', subject: 'Informatika', phone: '+998 97 345 67 89', joined_year: 2022, status: 'active', salary_base: 4600000 },
  { id: '14', full_name: 'Gulbahor Mirzayeva', initials: 'GM', position: 'Biologiya o\'qituvchisi', subject: 'Biologiya', phone: '+998 98 456 78 90', joined_year: 2015, status: 'active', salary_base: 4100000 },
]

export const mockSalary: SalaryRecord[] = [
  { id: 's1', staff_id: '1', staff_name: 'Aziz Karimov', position: 'Direktor', work_days: 22, total_days: 22, base_salary: 8500000, bonus: 1500000, total: 10000000, status: 'paid', month: '2025-06' },
  { id: 's2', staff_id: '2', staff_name: 'Dilnoza Rahimova', position: "O'quv ishlari (Zavuch)", work_days: 22, total_days: 22, base_salary: 6500000, bonus: 800000, total: 7300000, status: 'paid', month: '2025-06' },
  { id: 's3', staff_id: '3', staff_name: 'Sherzod Aliyev', position: 'Matematika o\'qituvchisi', work_days: 20, total_days: 22, lesson_hours: 36, base_salary: 4500000, bonus: 600000, total: 5100000, status: 'paid', month: '2025-06' },
  { id: 's4', staff_id: '4', staff_name: 'Gulnora Abdurahmonova', position: 'Fizika o\'qituvchisi', work_days: 22, total_days: 22, lesson_hours: 32, base_salary: 4200000, bonus: 500000, total: 4700000, status: 'paid', month: '2025-06' },
  { id: 's5', staff_id: '5', staff_name: 'Bekzod Toshmatov', position: 'Ingliz tili o\'qituvchisi', work_days: 18, total_days: 22, lesson_hours: 28, base_salary: 4800000, bonus: 400000, total: 5200000, status: 'pending', month: '2025-06' },
  { id: 's6', staff_id: '9', staff_name: 'Jasur Nazarov', position: 'Psixolog', work_days: 22, total_days: 22, base_salary: 3800000, bonus: 300000, total: 4100000, status: 'pending', month: '2025-06' },
  { id: 's7', staff_id: '12', staff_name: 'Zulfiya Hakimova', position: 'Geografiya o\'qituvchisi', work_days: 0, total_days: 22, base_salary: 4000000, bonus: 0, total: 0, status: 'pending', month: '2025-06' },
]

export const mockPayments: Payment[] = [
  { id: 'p1', student_name: 'Ali Valiyev', class_name: '5B', type: "O'quv to'lovi", amount: 350000, status: 'paid', date: '2025-06-05' },
  { id: 'p2', student_name: 'Zarina Sobirova', class_name: '7A', type: "O'quv to'lovi", amount: 350000, status: 'paid', date: '2025-06-03' },
  { id: 'p3', student_name: 'Javohir Abdullayev', class_name: '9C', type: "O'quv to'lovi", amount: 350000, status: 'pending', date: '2025-06-10' },
  { id: 'p4', student_name: 'Madina Rahimova', class_name: '5A', type: 'To\'garak badali', amount: 120000, status: 'paid', date: '2025-06-07' },
  { id: 'p5', student_name: 'Shohruh Normatov', class_name: '8B', type: 'Imtihon to\'lovi', amount: 50000, status: 'overdue', date: '2025-05-28' },
  { id: 'p6', student_name: 'Gulnora Karimova', class_name: '11A', type: "O'quv to'lovi", amount: 350000, status: 'paid', date: '2025-06-01' },
  { id: 'p7', student_name: "Botirjon O'ktamov", class_name: '6C', type: "O'quv to'lovi", amount: 350000, status: 'pending', date: '2025-06-12' },
  { id: 'p8', student_name: 'Dilfuza Ergasheva', class_name: '10B', type: 'Imtihon to\'lovi', amount: 50000, status: 'paid', date: '2025-06-08' },
]

export const mockExpenses: Expense[] = [
  { id: 'e1', category: 'Kommunal', amount: 2500000, date: '2025-06-05', note: 'Iyun oyi elektr energiyasi' },
  { id: 'e2', category: "O'quv qurollari", amount: 1800000, date: '2025-06-07', note: 'Maktabga doska va markerlar' },
  { id: 'e3', category: 'Ta\'mirlash', amount: 3500000, date: '2025-06-02', note: 'Sinf xonasi ta\'mirlash' },
  { id: 'e4', category: 'Kantselyariya', amount: 450000, date: '2025-06-10', note: 'Ofis uchun qog\'oz va ruchkalar' },
  { id: 'e5', category: "Transport", amount: 600000, date: '2025-06-08', note: 'Ekskursiya avtobusi' },
]

export const mockClasses: SchoolClass[] = [
  { id: '5A', name: '5A', room: '205', class_teacher: 'Sherzod Aliyev', student_count: 32, boys: 17, girls: 15, attendance_rate: 94 },
  { id: '5B', name: '5B', room: '206', class_teacher: 'Nargiza Usmanova', student_count: 30, boys: 14, girls: 16, attendance_rate: 91 },
  { id: '6A', name: '6A', room: '207', class_teacher: 'Gulnora Abdurahmonova', student_count: 28, boys: 15, girls: 13, attendance_rate: 88 },
  { id: '7A', name: '7A', room: '301', class_teacher: 'Rustam Xolmurodov', student_count: 33, boys: 18, girls: 15, attendance_rate: 92 },
  { id: '8B', name: '8B', room: '302', class_teacher: 'Lola Qodirova', student_count: 29, boys: 16, girls: 13, attendance_rate: 85 },
  { id: '9C', name: '9C', room: '303', class_teacher: 'Bekzod Toshmatov', student_count: 31, boys: 16, girls: 15, attendance_rate: 90 },
  { id: '10A', name: '10A', room: '304', class_teacher: 'Matluba Ergasheva', student_count: 27, boys: 13, girls: 14, attendance_rate: 95 },
  { id: '11A', name: '11A', room: '305', class_teacher: 'Furqat Abdullayev', student_count: 24, boys: 12, girls: 12, attendance_rate: 97 },
]

export const mockLessons: Lesson[] = [
  { id: 'l1', subject: 'Matematika', teacher: 'Sherzod Aliyev', teacher_short: 'S. Aliyev', class_id: '5A', day: 0, period: 1 },
  { id: 'l2', subject: 'Ona tili', teacher: 'Nargiza Usmanova', teacher_short: 'N. Usmanova', class_id: '5A', day: 0, period: 2 },
  { id: 'l3', subject: 'Matematika', teacher: 'Sherzod Aliyev', teacher_short: 'S. Aliyev', class_id: '5B', day: 0, period: 3 },
  { id: 'l4', subject: 'Fizika', teacher: 'Gulnora Abdurahmonova', teacher_short: 'G. Abdurahmonova', class_id: '7A', day: 0, period: 2 },
  { id: 'l5', subject: 'Ingliz tili', teacher: 'Bekzod Toshmatov', teacher_short: 'B. Toshmatov', class_id: '5A', day: 1, period: 1 },
  { id: 'l6', subject: 'Tarix', teacher: 'Rustam Xolmurodov', teacher_short: 'R. Xolmurodov', class_id: '7A', day: 1, period: 3 },
  { id: 'l7', subject: 'Matematika', teacher: 'Sherzod Aliyev', teacher_short: 'S. Aliyev', class_id: '9C', day: 1, period: 4 },
  { id: 'l8', subject: 'Kimyo', teacher: 'Lola Qodirova', teacher_short: 'L. Qodirova', class_id: '8B', day: 2, period: 2 },
  { id: 'l9', subject: 'Fizika', teacher: 'Gulnora Abdurahmonova', teacher_short: 'G. Abdurahmonova', class_id: '5B', day: 2, period: 4 },
  { id: 'l10', subject: 'Informatika', teacher: 'Furqat Abdullayev', teacher_short: 'F. Abdullayev', class_id: '5A', day: 3, period: 1 },
  { id: 'l11', subject: 'Geografiya', teacher: 'Zulfiya Hakimova', teacher_short: 'Z. Hakimova', class_id: '7A', day: 3, period: 2 },
  { id: 'l12', subject: 'Matematika', teacher: 'Sherzod Aliyev', teacher_short: 'S. Aliyev', class_id: '8B', day: 4, period: 1 },
]

export const mockWorkload: TeacherWorkload[] = [
  { id: 'w1', name: 'Sherzod Aliyev', subject: 'Matematika', weekly_hours: 28, max_hours: 32, status: 'normal' },
  { id: 'w2', name: 'Gulnora Abdurahmonova', subject: 'Fizika', weekly_hours: 24, max_hours: 28, status: 'normal' },
  { id: 'w3', name: 'Bekzod Toshmatov', subject: 'Ingliz tili', weekly_hours: 20, max_hours: 24, status: 'normal' },
  { id: 'w4', name: 'Nargiza Usmanova', subject: 'Ona tili', weekly_hours: 22, max_hours: 24, status: 'normal' },
  { id: 'w5', name: 'Rustam Xolmurodov', subject: 'Tarix', weekly_hours: 18, max_hours: 24, status: 'normal' },
  { id: 'w6', name: 'Lola Qodirova', subject: 'Kimyo', weekly_hours: 16, max_hours: 20, status: 'normal' },
  { id: 'w7', name: 'Matluba Ergasheva', subject: 'Boshlang\'ich ta\'lim', weekly_hours: 30, max_hours: 28, status: 'heavy' },
  { id: 'w8', name: 'Oybek Sultonov', subject: 'Jismoniy tarbiya', weekly_hours: 26, max_hours: 32, status: 'normal' },
  { id: 'w9', name: 'Furqat Abdullayev', subject: 'Informatika', weekly_hours: 14, max_hours: 20, status: 'normal' },
  { id: 'w10', name: 'Gulbahor Mirzayeva', subject: 'Biologiya', weekly_hours: 20, max_hours: 24, status: 'normal' },
]

export const mockExams: Exam[] = [
  { id: 'ex1', date: '2025-06-20', classes: ['5A', '5B'], subject: 'Matematika', teacher: 'Sherzod Aliyev', room: '205', duration_min: 90, status: 'scheduled' },
  { id: 'ex2', date: '2025-06-18', classes: ['7A'], subject: 'Fizika', teacher: 'Gulnora Abdurahmonova', room: '207', duration_min: 60, status: 'done' },
  { id: 'ex3', date: '2025-06-25', classes: ['9C', '8B'], subject: 'Ingliz tili', teacher: 'Bekzod Toshmatov', room: '301', duration_min: 90, status: 'scheduled' },
  { id: 'ex4', date: '2025-06-15', classes: ['11A'], subject: 'Kimyo', teacher: 'Lola Qodirova', room: '303', duration_min: 120, status: 'done' },
  { id: 'ex5', date: '2025-06-28', classes: ['5A', '5B', '6A'], subject: 'Ona tili', teacher: 'Nargiza Usmanova', room: '206', duration_min: 90, status: 'scheduled' },
  { id: 'ex6', date: '2025-06-22', classes: ['10A'], subject: 'Matematika', teacher: 'Sherzod Aliyev', room: '205', duration_min: 90, status: 'scheduled' },
  { id: 'ex7', date: '2025-06-12', classes: ['7A', '8B'], subject: 'Tarix', teacher: 'Rustam Xolmurodov', room: '302', duration_min: 60, status: 'done' },
]

export const mockDocuments: Document[] = [
  { id: 'd1', number: 45, title: "O'quv yili yakuniy hisoboti", date: '2025-06-15', signed: true, signed_by: 'Aziz Karimov' },
  { id: 'd2', number: 46, title: 'Yangi o\'quv yili rejasi', date: '2025-06-10', signed: true, signed_by: 'Aziz Karimov' },
  { id: 'd3', number: 47, title: "O'qituvchilar malaka oshirish rejasi", date: '2025-06-18', signed: false },
  { id: 'd4', number: 48, title: 'Maktab budjeti loyihasi', date: '2025-06-20', signed: false },
  { id: 'd5', number: 49, title: 'Davlat attestatsiya natijalari', date: '2025-06-12', signed: true, signed_by: 'Aziz Karimov' },
  { id: 'd6', number: 50, title: 'Pedagogik kengash bayonnomasi', date: '2025-06-22', signed: false },
]

export const mockParents: ParentContact[] = [
  { id: 'pt1', parent_name: 'Akbar Valiyev', child_name: 'Ali Valiyev', class_name: '5B', last_contact: '2025-06-20', status: 'replied' },
  { id: 'pt2', parent_name: 'Gulnora Sobirova', child_name: 'Zarina Sobirova', class_name: '7A', last_contact: '2025-06-18', status: 'seen' },
  { id: 'pt3', parent_name: 'Rustam Abdullayev', child_name: 'Javohir Abdullayev', class_name: '9C', last_contact: '2025-06-15', status: 'replied' },
  { id: 'pt4', parent_name: 'Zulfiya Rahimova', child_name: 'Madina Rahimova', class_name: '5A', last_contact: '2025-06-10', status: 'no_reply' },
  { id: 'pt5', parent_name: 'Botir Normatov', child_name: 'Shohruh Normatov', class_name: '8B', last_contact: '2025-06-22', status: 'pending' },
  { id: 'pt6', parent_name: 'Dilshod Karimov', child_name: 'Gulnora Karimova', class_name: '11A', last_contact: '2025-06-19', status: 'replied' },
  { id: 'pt7', parent_name: 'Maftuna Ergasheva', child_name: 'Dilfuza Ergasheva', class_name: '10B', last_contact: '2025-06-14', status: 'no_reply' },
]

export const mockEvents: SchoolEvent[] = [
  { id: 'ev1', title: "Mustaqillik kuni", date: '2025-09-01', day: 1, month: 'Sentabr', time: '09:00', location: "Maktab hovlisi", responsible: 'Aziz Karimov', grades: '1-11', status: 'upcoming' },
  { id: 'ev2', title: "O'qituvchilar kuni", date: '2025-10-01', day: 1, month: 'Oktabr', time: '10:00', location: 'Akt zal', responsible: 'Dilnoza Rahimova', grades: '5-11', status: 'upcoming' },
  { id: 'ev3', title: 'Matematika olimpiadasi', date: '2025-06-22', day: 22, month: 'Iyun', time: '14:00', location: '205-xona', responsible: 'Sherzod Aliyev', grades: '9-11', status: 'today' },
  { id: 'ev4', title: 'Kitobxonlik kuni', date: '2025-06-15', day: 15, month: 'Iyun', time: '11:00', location: 'Kutubxona', responsible: 'Nargiza Usmanova', grades: '5-8', status: 'done' },
  { id: 'ev5', title: "Sport musobaqasi", date: '2025-06-28', day: 28, month: 'Iyun', time: '15:00', location: 'Sport zal', responsible: 'Oybek Sultonov', grades: '5-11', status: 'preparing' },
  { id: 'ev6', title: 'Yil yakuniy anjumani', date: '2025-06-30', day: 30, month: 'Iyun', time: '10:00', location: 'Akt zal', responsible: 'Aziz Karimov', grades: '1-11', status: 'preparing' },
]

export const mockDiscipline: DisciplineRecord[] = [
  { id: 'dc1', student_name: 'Ali Valiyev', class_name: '5B', incident: 'Darsga kechikish', date: '2025-06-20', action: 'Ogohlantirish', status: 'resolved' },
  { id: 'dc2', student_name: 'Javohir Abdullayev', class_name: '9C', incident: 'Darsda tartib buzish', date: '2025-06-18', action: "Sinf rahbari bilan suhbat", status: 'in_progress' },
  { id: 'dc3', student_name: 'Shohruh Normatov', class_name: '8B', incident: 'Sababsiz dars qoldirish', date: '2025-06-22', action: 'Ota-onaga xabar', status: 'new' },
  { id: 'dc4', student_name: 'Madina Rahimova', class_name: '5A', incident: 'Forma talabiga rioya qilmaslik', date: '2025-06-17', action: 'Ogohlantirish', status: 'resolved' },
  { id: 'dc5', student_name: 'Botirjon O\'ktamov', class_name: '6C', incident: 'Tortishuv', date: '2025-06-21', action: "Ota-ona chaqirish", status: 'in_progress' },
]

export const mockPsychoSessions: PsychoSession[] = [
  { id: 'ps1', student_name: 'Ali Valiyev', class_name: '5B', session_date: '2025-06-15', psychologist: 'Jasur Nazarov', result: 'monitoring', next_session: '2025-06-29' },
  { id: 'ps2', student_name: 'Zarina Sobirova', class_name: '7A', session_date: '2025-06-10', psychologist: 'Jasur Nazarov', result: 'improving' },
  { id: 'ps3', student_name: 'Javohir Abdullayev', class_name: '9C', session_date: '2025-06-20', psychologist: 'Jasur Nazarov', result: 'adapting', next_session: '2025-07-04' },
  { id: 'ps4', student_name: 'Madina Rahimova', class_name: '5A', session_date: '2025-06-08', psychologist: 'Jasur Nazarov', result: 'done' },
  { id: 'ps5', student_name: 'Shohruh Normatov', class_name: '8B', session_date: '2025-06-22', psychologist: 'Jasur Nazarov', result: 'monitoring', next_session: '2025-07-06' },
]

export const mockSportSections: SportSection[] = [
  { id: 'sp1', name: 'Futbol', schedule: 'Du, Chor 15:00-16:30', responsible: 'Oybek Sultonov', student_count: 24 },
  { id: 'sp2', name: 'Basketbol', schedule: 'Ses, Pay 15:00-16:30', responsible: 'Oybek Sultonov', student_count: 18 },
  { id: 'sp3', name: 'Shaxmat', schedule: 'Chor, Jum 14:00-15:00', responsible: 'Jasur Nazarov', student_count: 14 },
  { id: 'sp4', name: 'Voleybol', schedule: 'Du, Pay 16:00-17:30', responsible: 'Oybek Sultonov', student_count: 20 },
  { id: 'sp5', name: 'Kurash', schedule: 'Ses, Jum 15:00-16:30', responsible: 'Oybek Sultonov', student_count: 16 },
  { id: 'sp6', name: 'Robototexnika', schedule: 'Du, Chor 14:00-15:30', responsible: "Furqat Abdullayev", student_count: 12 },
]

export const mockSportAchievements: SportAchievement[] = [
  { id: 'sa1', title: 'Tuman futbol chempionati', date: '2025-05-15', place: '1' },
  { id: 'sa2', title: 'Viloyat basketbol turniri', date: '2025-04-20', place: '2' },
  { id: 'sa3', title: 'Shaxmat turniri', date: '2025-06-10', place: '3' },
  { id: 'sa4', title: 'Kurash musobaqasi', date: '2025-05-28', place: 'participant' },
  { id: 'sa5', title: 'Robototexnika ko\'rgazmasi', date: '2025-06-05', place: '1' },
]

export const mockWeekAttendance = [
  { day: 'Du', rate: 93 },
  { day: 'Ses', rate: 91 },
  { day: 'Chor', rate: 95 },
  { day: 'Pay', rate: 89 },
  { day: 'Jum', rate: 94 },
]

export const mockDashboardStats: DashboardStats = {
  total_students: 874,
  total_teachers: 52,
  monthly_income: 45800000,
  attendance_rate: 92.4,
  weekly_attendance: mockWeekAttendance,
  recent_activities: [
    { id: 'a1', user: 'Sherzod Aliyev', initials: 'SA', role: "O'qituvchi", action: '5A sinfga baho qo\'ydi', time: '5 min', status: 'active' },
    { id: 'a2', user: 'Dilnoza Rahimova', initials: 'DR', role: 'Zavuch', action: "O'quv rejasini tasdiqladi", time: '15 min', status: 'active' },
    { id: 'a3', user: 'Bekzod Toshmatov', initials: 'BT', role: "O'qituvchi", action: 'Ingliz tili dars materialini yukladi', time: '32 min', status: 'active' },
    { id: 'a4', user: 'Lola Qodirova', initials: 'LQ', role: "O'qituvchi", action: 'Imtihon natijalarini kiritdi', time: '1 soat', status: 'active' },
  ],
  notifications: [
    { id: 'n1', message: '3 o\'qituvchi bugun darsga kelmadi', time: '10 min', type: 'error' },
    { id: 'n2', message: 'Iyun oyi uchun budget hisoboti tayyor', time: '30 min', type: 'info' },
    { id: 'n3', message: 'Matematika olimpiadasi bugun 14:00 da', time: '1 soat', type: 'warning' },
    { id: 'n4', message: '5 o\'quvchining to\'lovi muddati o\'tgan', time: '3 soat', type: 'error' },
  ],
}
