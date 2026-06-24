import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common'
import { AttendanceService } from './attendance.service'
import { CreateAttendanceDto, UpdateAttendanceDto, BulkAttendanceDto, AttendanceQueryDto } from './dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'

@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  findAll(@Query() query: AttendanceQueryDto) {
    return this.attendanceService.findAll(query)
  }

  @Get('stats')
  getStats(@Query() query: { classId?: string; studentId?: string; month?: string; date?: string }) {
    return this.attendanceService.getStats(query.classId, query.studentId, query.month)
  }

  @Get('class/:classId/date/:date')
  findByDateAndClass(@Param('classId') classId: string, @Param('date') date: string) {
    return this.attendanceService.findByDateAndClass(classId, date)
  }

  @Get('student/:studentId')
  findStudentHistory(@Param('studentId') studentId: string, @Query('month') month?: string) {
    return this.attendanceService.findStudentHistory(studentId, month)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id)
  }

  @Post()
  create(@Body() dto: CreateAttendanceDto, @Req() req: any) {
    const userId = req.user.id
    return this.attendanceService.create(dto, userId)
  }

  @Post('bulk')
  bulkCreate(@Body() dto: BulkAttendanceDto, @Req() req: any) {
    const userId = req.user.id
    return this.attendanceService.bulkCreate(dto, userId)
  }

  @Post('face-check')
  faceIdCheck(@Body('classId') classId: string, @Body('imageData') imageData: string) {
    return this.attendanceService.faceIdAttendance(classId, imageData)
  }

  @Post('qr-scan')
  qrScan(@Body('qrCode') qrCode: string, @Body('classId') classId: string) {
    return this.attendanceService.qrAttendance(qrCode, classId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAttendanceDto) {
    return this.attendanceService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(id)
  }
}
