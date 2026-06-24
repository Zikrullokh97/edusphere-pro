'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { User, Calendar, BookOpen, Clock, Users, Mail, Phone, MapPin } from 'lucide-react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Tabs, TabItem } from '@/components/ui/Tabs'
import { useStudents } from '@/services/student.service'
import { useAttendance } from '@/services/attendance.service'
import { formatDate, formatPercentage, formatPhone } from '@/lib/utils/format'
import { toast } from 'react-hot-toast'

export default function StudentProfilePage() {
  const params = useParams()
  const studentId = params.id as string
  const [activeTab, setActiveTab] = useState('profile')

  const { data: student, isLoading: studentLoading } = useStudents().useOne(studentId)
  const { data: attendance } = useAttendance().useStudentHistory(studentId)

  const tabs: TabItem[] = [
    { id: 'profile', label: 'Profil', icon: <User className="w-4 h-4" /> },
    { id: 'attendance', label: 'Davomat', icon: <Calendar className="w-4 h-4" /> },
    { id: 'grades', label: 'Baholar', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'schedule', label: 'Jadval', icon: <Clock className="w-4 h-4" /> },
  ]

  if (studentLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardBody>
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full animate-pulse" />
              <div className="flex-1 space-y-3">
                <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }

  if (!student) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O'quvchi topilmadi</h3>
            <p className="text-sm text-gray-500">Kerakli o'quvchi ma'lumotlari mavjud emas</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  const attendanceStats = {
    total: attendance?.length || 0,
    present: attendance?.filter(a => a.status === 'present').length || 0,
    absent: attendance?.filter(a => a.status === 'absent').length || 0,
    late: attendance?.filter(a => a.status === 'late').length || 0,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">O'quvchi profili</h1>
          <p className="text-sm text-gray-500 mt-1">
            Batafsil ma'lumot va statistika
          </p>
        </div>
        <Button variant="primary">
          Tahrirlash
        </Button>
      </div>

      {/* Profile Card */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar name={student.fullName} size="xl" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{student.fullName}</h2>
              <p className="text-sm text-gray-500 mb-4">{student.class?.name}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{student.userId || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{formatPhone(student.phone)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{student.address || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{formatDate(student.birthDate, 'long')}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Badge variant={student.gender === 'MALE' ? 'primary' : 'info'}>
                  {student.gender === 'MALE' ? "O'g'il" : 'Qiz'}
                </Badge>
                <Badge variant="success">Faol</Badge>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader title="Shaxsiy ma'lumotlar" />
            <CardBody>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">To'liq ism</p>
                  <p className="text-sm font-medium text-gray-900">{student.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Jins</p>
                  <p className="text-sm font-medium text-gray-900">
                    {student.gender === 'MALE' ? "O'g'il" : 'Qiz'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tug'ilgan sana</p>
                  <p className="text-sm font-medium text-gray-900">{formatDate(student.birthDate, 'long')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Manzil</p>
                  <p className="text-sm font-medium text-gray-900">{student.address || 'N/A'}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Parent Information */}
          {student.parent && (
            <Card>
              <CardHeader title="Ota-ona ma'lumotlari" />
              <CardBody>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={student.parent.fullName} size="sm" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{student.parent.fullName}</p>
                      <p className="text-xs text-gray-500">Ota-ona</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefon</p>
                    <p className="text-sm font-medium text-gray-900">{formatPhone(student.parent.phone)}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Quick Stats */}
          <Card>
            <CardHeader title="Tezkor statistika" />
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Davomat darajasi</span>
                  <Badge variant={student.attendanceRate && student.attendanceRate >= 80 ? 'success' : 'warning'}>
                    {formatPercentage(student.attendanceRate)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Jami davomat</span>
                  <span className="text-sm font-medium text-gray-900">{attendanceStats.total} kun</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Kelgan</span>
                  <span className="text-sm font-medium text-green-600">{attendanceStats.present}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Kelmagan</span>
                  <span className="text-sm font-medium text-red-600">{attendanceStats.absent}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === 'attendance' && (
        <Card>
          <CardHeader title="Davomat tarixi" />
          <CardBody>
            {!attendance || attendance.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Davomat ma'lumotlari topilmadi</p>
              </div>
            ) : (
              <div className="space-y-2">
                {attendance.slice(0, 10).map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        record.status === 'present' ? 'bg-green-500' :
                        record.status === 'absent' ? 'bg-red-500' :
                        record.status === 'late' ? 'bg-yellow-500' :
                        'bg-blue-500'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{formatDate(record.date, 'short')}</p>
                        <p className="text-xs text-gray-500">{record.className}</p>
                      </div>
                    </div>
                    <Badge variant={
                      record.status === 'present' ? 'success' :
                      record.status === 'absent' ? 'danger' :
                      record.status === 'late' ? 'warning' :
                      'info'
                    }>
                      {record.status === 'present' ? 'Kelgan' :
                       record.status === 'absent' ? 'Kelmagan' :
                       record.status === 'late' ? 'Kech qolgan' :
                       'Sababli'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {activeTab === 'grades' && (
        <Card>
          <CardHeader title="Baholar" />
          <CardBody>
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Baholar ma'lumotlari tez orada qo'shiladi</p>
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === 'schedule' && (
        <Card>
          <CardHeader title="Dars jadvali" />
          <CardBody>
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Dars jadvali tez orada qo'shiladi</p>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  )
}