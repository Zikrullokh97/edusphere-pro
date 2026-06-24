export class CreateAttendanceDto {
  studentId!: string
  classId!: string
  date!: Date
  status!: string
  method?: string
  notes?: string
}
