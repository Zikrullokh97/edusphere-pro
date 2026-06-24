'use client'

import { useState } from 'react'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, Pagination } from '@/components/ui/Table'
import { Modal, ConfirmModal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { useAttendance } from '@/services/attendance.service'
import { useClasses } from '@/services/class.service'
import { formatDate } from '@/lib/utils/format'
import { toast } from 'react-hot-toast'

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedClass, setSelectedClass] = useState('')
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [attendanceStatus, setAttendanceStatus] = useState<'present' | 'absent' | 'late' | 'excused'>('present')

  const { data: attendance, isLoading: attendanceLoading } = useAttendance().useRecords({ 
    classId: selectedClass, 
    date: selectedDate 
  })
  
  const { data: classes } = useClasses().useAll()
  const { data: stats } = useAttendance().useStats({ 
    classId: selectedClass
  })

  const handleMarkAttendance = (student: any) => {
    setSelectedStudent(student)
    setIsMarkModalOpen(true)
  }

  const confirmMarkAttendance = async () => {
    if (!selectedStudent) return
    toast.success('Davomat belgilandi')
    setIsMarkModalOpen(false)
    setSelectedStudent(null)
  }

  const columns = [
    {
      key: 'studentName',
      title: 'O\'quvchi',
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {value.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">{row.className}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'date',
      title: 'Sana',
      render: (value: string) => formatDate(value, 'short'),
    },
    {
      key: 'status',
      title: 'Holat',
      render: (value: string) => {
        const variants: Record<string, 'success' | 'danger' | 'warning' | 'info'> = {
          present: 'success',
          absent: 'danger',
          late: 'warning',
          excused: 'info',
        }
        const labels: Record<string, string> = {
          present: 'Kelgan',
          absent: 'Kelmagan',
          late: 'Kech qolgan',
          excused: 'Sababli',
        }
        return <Badge variant={variants[value]}>{labels[value] || value}</Badge>
      },
    },
    {
      key: 'method',
      title: 'Usul',
      render: (value: string) => {
        const labels: Record<string, string> = {
          manual: 'Qo\'lda',
          qr: 'QR kod',
          face_id: 'Yuzni aniqlash',
        }
        return <span className="text-sm text-gray-600">{labels[value] || value}</span>
      },
    },
  ]

  const statCards = [
    {
      title: 'Jami kunlar',
      value: stats?.totalDays || 0,
      icon: Calendar,
      color: 'blue',
    },
    {
      title: 'Kelgan',
      value: stats?.presentDays || 0,
      icon: CheckCircle,
      color: 'green',
    },
    {
      title: 'Kelmagan',
      value: stats?.absentDays || 0,
      icon: XCircle,
      color: 'red',
    },
    {
      title: 'Kech qolgan',
      value: stats?.lateDays || 0,
      icon: AlertCircle,
      color: 'yellow',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Davomat</h1>
        <p className="text-sm text-gray-500 mt-1">
          O'quvchilar davomatini boshqarish
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'red' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Attendance Rate */}
      {stats && (
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Umumiy davomat darajasi</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.attendanceRate.toFixed(1)}%
                </p>
              </div>
              <div className="w-32 h-32">
                <div className="relative w-full h-full rounded-full border-8 border-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {stats.attendanceRate.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                leftIcon={<Calendar className="w-4 h-4" />}
              />
            </div>
            <div className="sm:w-64">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Barcha sinflar</option>
                {classes?.map((cls: any) => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
            </div>
            <Button variant="primary" icon={<CheckCircle className="w-4 h-4" />}>
              Davomat olish
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Attendance Table */}
      <Table
        columns={columns}
        data={attendance || []}
        loading={attendanceLoading}
        error={undefined}
        emptyMessage="Davomat ma'lumotlari topilmadi"
        rowKey="id"
        actions={{
          view: (record) => console.log('View', record),
          edit: handleMarkAttendance,
        }}
      />

      {/* Mark Attendance Modal */}
      <Modal
        isOpen={isMarkModalOpen}
        onClose={() => {
          setIsMarkModalOpen(false)
          setSelectedStudent(null)
        }}
        title="Davomat belgilash"
        subtitle={selectedStudent?.studentName}
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setIsMarkModalOpen(false)
                setSelectedStudent(null)
              }}
            >
              Bekor qilish
            </Button>
            <Button onClick={confirmMarkAttendance}>
              Saqlash
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Holat <span className="text-red-500">*</span>
            </label>
            <select
              value={attendanceStatus}
              onChange={(e) => setAttendanceStatus(e.target.value as any)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="present">Kelgan</option>
              <option value="absent">Kelmagan</option>
              <option value="late">Kech qolgan</option>
              <option value="excused">Sababli</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Izoh
            </label>
            <textarea
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Izoh kiriting..."
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
