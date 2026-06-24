export class AttendanceItemDto {
  studentId!: string
  status!: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'
}

export class BulkAttendanceDto {
  classId!: string
  date!: string
  attendance!: AttendanceItemDto[]
}
