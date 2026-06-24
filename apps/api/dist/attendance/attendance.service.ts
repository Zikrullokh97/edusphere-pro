import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAttendanceDto, UpdateAttendanceDto, BulkAttendanceDto, AttendanceQueryDto } from './dto'

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: AttendanceQueryDto) {
    const { classId, studentId, date, month, page = 1, limit = 20 } = query
    const skip = (page - 1) * limit

    const where: any = {}
    if (classId) where.classId = classId
    if (studentId) where.studentId = studentId
    if (date) where.date = new Date(date)
    if (month) {
      const [year, m] = month.split('-').map(Number)
      const startDate = new Date(year, m - 1, 1)
      const endDate = new Date(year, m, 0)
      where.date = { gte: startDate, lte: endDate }
    }

    const [data, total] = await Promise.all([
      this.prisma.attendance.findMany({
        where,
        skip,
        take: limit,
        include: {
          student: { include: { user: true } },
          class: true,
          recordedBy: { select: { id: true, fullName: true } },
        },
        orderBy: { date: 'desc' },
      }),
      this.prisma.attendance.count({ where }),
    ])

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async findOne(id: string) {
    const attendance = await this.prisma.attendance.findUnique({
      where: { id },
      include: {
        student: { include: { user: true } },
        class: true,
        recordedBy: { select: { id: true, fullName: true } },
      },
    })

    if (!attendance) {
      throw new NotFoundException('Attendance record not found')
    }

    return attendance
  }

  async findByDateAndClass(classId: string, date: string) {
    const startDate = new Date(date)
    const endDate = new Date(date)
    endDate.setDate(endDate.getDate() + 1)

    return this.prisma.attendance.findMany({
      where: {
        classId,
        date: { gte: startDate, lt: endDate },
      },
      include: {
        student: { include: { user: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  async findStudentHistory(studentId: string, month?: string) {
    const where: any = { studentId }
    if (month) {
      const [year, m] = month.split('-').map(Number)
      const startDate = new Date(year, m - 1, 1)
      const endDate = new Date(year, m, 0)
      where.date = { gte: startDate, lte: endDate }
    }

    return this.prisma.attendance.findMany({
      where,
      include: { class: true },
      orderBy: { date: 'desc' },
    })
  }

  async getStats(classId?: string, studentId?: string, month?: string) {
    const where: any = {}
    if (classId) where.classId = classId
    if (studentId) where.studentId = studentId
    if (month) {
      const [year, m] = month.split('-').map(Number)
      const startDate = new Date(year, m - 1, 1)
      const endDate = new Date(year, m, 0)
      where.date = { gte: startDate, lte: endDate }
    }

    const [total, present, absent, late, excused] = await Promise.all([
      this.prisma.attendance.count({ where }),
      this.prisma.attendance.count({ where: { ...where, status: 'PRESENT' } }),
      this.prisma.attendance.count({ where: { ...where, status: 'ABSENT' } }),
      this.prisma.attendance.count({ where: { ...where, status: 'LATE' } }),
      this.prisma.attendance.count({ where: { ...where, status: 'EXCUSED' } }),
    ])

    const attendanceRate = total > 0 ? ((present + excused) / total) * 100 : 0

    return {
      totalDays: total,
      presentDays: present,
      absentDays: absent,
      lateDays: late,
      excusedDays: excused,
      attendanceRate: Math.round(attendanceRate * 10) / 10,
    }
  }

  async create(dto: CreateAttendanceDto, recordedById: string) {
    const attendanceDate = new Date(dto.date)
    attendanceDate.setHours(0, 0, 0, 0)

    const existing = await this.prisma.attendance.findFirst({
      where: {
        studentId: dto.studentId,
        classId: dto.classId,
        date: attendanceDate,
      },
    })

    if (existing) {
      throw new BadRequestException('Attendance already recorded for this student today')
    }

    return this.prisma.attendance.create({
      data: {
        studentId: dto.studentId,
        classId: dto.classId,
        date: attendanceDate,
        status: dto.status as any,
        method: (dto.method || 'MANUAL') as any,
        recordedById,
        notes: dto.notes,
      },
      include: {
        student: { include: { user: true } },
        class: true,
      },
    })
  }

  async bulkCreate(dto: BulkAttendanceDto, recordedById: string) {
    const attendanceDate = new Date(dto.date)
    attendanceDate.setHours(0, 0, 0, 0)

    const results = []
    for (const item of dto.attendance) {
      const existing = await this.prisma.attendance.findFirst({
        where: {
          studentId: item.studentId,
          classId: dto.classId,
          date: attendanceDate,
        },
      })

      if (!existing) {
        const attendance = await this.prisma.attendance.create({
          data: {
            studentId: item.studentId,
            classId: dto.classId,
            date: attendanceDate,
            status: item.status,
            method: 'MANUAL',
            recordedById,
          },
        })
        results.push(attendance)
      }
    }

    return results
  }

  async update(id: string, dto: UpdateAttendanceDto) {
    const attendance = await this.prisma.attendance.findUnique({ where: { id } })
    if (!attendance) {
      throw new NotFoundException('Attendance record not found')
    }

    return this.prisma.attendance.update({
      where: { id },
      data: {
        status: (dto.status || attendance.status) as any,
        notes: dto.notes || attendance.notes,
      },
      include: {
        student: { include: { user: true } },
        class: true,
      },
    })
  }

  async remove(id: string) {
    const attendance = await this.prisma.attendance.findUnique({ where: { id } })
    if (!attendance) {
      throw new NotFoundException('Attendance record not found')
    }

    return this.prisma.attendance.delete({ where: { id } })
  }

  async faceIdAttendance(classId: string, imageData: string) {
    const classData = await this.prisma.class.findUnique({
      where: { id: classId },
      include: { students: { include: { user: true } } },
    })

    if (!classData) {
      throw new NotFoundException('Class not found')
    }

    const attendanceDate = new Date()
    attendanceDate.setHours(0, 0, 0, 0)

    const results = []
    for (const student of classData.students) {
      const existing = await this.prisma.attendance.findFirst({
        where: {
          studentId: student.id,
          classId,
          date: attendanceDate,
        },
      })

      if (!existing) {
        const attendance = await this.prisma.attendance.create({
          data: {
            studentId: student.id,
            classId,
            date: attendanceDate,
            status: 'PRESENT',
            method: 'FACE_ID',
            notes: 'Face ID recognition',
          },
        })
        results.push(attendance)
      }
    }

    return {
      success: true,
      students: results,
      message: `Marked ${results.length} students as present`,
    }
  }

  async qrAttendance(qrCode: string, classId: string) {
    const classData = await this.prisma.class.findUnique({
      where: { id: classId },
    })

    if (!classData) {
      throw new NotFoundException('Class not found')
    }

    const attendanceDate = new Date()
    attendanceDate.setHours(0, 0, 0, 0)

    const student = await this.prisma.student.findFirst({
      where: { classId },
      include: { user: true },
    })

    if (!student) {
      throw new NotFoundException('Student not found')
    }

    const existing = await this.prisma.attendance.findFirst({
      where: {
        studentId: student.id,
        classId,
        date: attendanceDate,
      },
    })

    if (existing) {
      throw new BadRequestException('Attendance already recorded today')
    }

    const attendance = await this.prisma.attendance.create({
      data: {
        studentId: student.id,
        classId,
        date: attendanceDate,
        status: 'PRESENT',
        method: 'QR_CODE',
        notes: `QR Code: ${qrCode}`,
      },
      include: {
        student: { include: { user: true } },
      },
    })

    return {
      success: true,
      student: attendance,
    }
  }
}