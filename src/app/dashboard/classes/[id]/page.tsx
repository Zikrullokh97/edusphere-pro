'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Users, Calendar, Clock, BookOpen, UserCheck, MapPin } from 'lucide-react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Tabs, TabItem } from '@/components/ui/Tabs'
import { useClasses } from '@/services/class.service'
import { useStudents } from '@/services/student.service'
import { useAttendance } from '@/services/attendance.service'
import { formatDate, formatPercentage } from '@/lib/utils/format'

export default function ClassProfilePage() {
  const params = useParams()
  const classId = params.id as string
  const [activeTab, setActiveTab] = useState('overview')

  const { data: classData, isLoading: classLoading } = useClasses().useOne(classId)
  const { data: students } = useStudents().useAll({ classId })
  const { data: attendanceStats } = useAttendance().useStats({ classId })

  const tabs: TabItem[] = [
    { id: 'overview', label: 'Umumiy', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'students', label: 'O\'quvchilar', icon: <Users className="w-4 h-4" /> },
    { id: 'attendance', label: 'Davomat', icon: <Calendar className="w-4 h-4" /> },
    { id: 'schedule', label: 'Jadval', icon: <Clock className="w-4 h-4" /> },
  ]

  if (classLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardBody>
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }

  if (!classData) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sinf topilmadi</h3>
            <p className="text-sm text-gray-500">Kerakli sinf ma'lumotlari mavjud emas</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  const attendanceRate = attendanceStats?.attendanceRate || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{classData.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sinf ma'lumotlari va statistika
          </p>
        </div>
        <Button variant="primary">
          Tahrirlash
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Jami o'quvchilar</p>
                <p className="text-2xl font-bold text-gray-900">{classData.studentCount || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">O'g'il bolalar</p>
                <p className="text-2xl font-bold text-gray-900">{classData.boys || 0}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Qiz bolalar</p>
                <p className="text-2xl font-bold text-gray-900">{classData.girls || 0}</p>
              </div>
              <div className="p-3 bg-pink-100 rounded-lg">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Davomat darajasi</p>
                <p className="text-2xl font-bold text-gray-900">{formatPercentage(attendanceRate)}</p>
              </div>
              <div className={`p-3 rounded-lg ${
                attendanceRate >= 80 ? 'bg-green-100' :
                attendanceRate >= 60 ? 'bg-yellow-100' :
                'bg-red-100'
              }`}>
                <Calendar className={`w-6 h-6 ${
                  attendanceRate >= 80 ? 'text-green-600' :
                  attendanceRate >= 60 ? 'text-yellow-600' :
                  'text-red-600'
                }`} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Class Info Card */}
      <Card>
        <CardHeader title="Sinf ma'lumotlari" />
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Sinf nomi</p>
              <p className="text-base font-semibold text-gray-900">{classData.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Xona</p>
              <p className="text-base font-semibold text-gray-900">{classData.room}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Sinf rahbari</p>
              <p className="text-base font-semibold text-gray-900">{classData.classTeacher}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Holat</p>
              <Badge variant="success">Faol</Badge>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader title="O'quvchilar tarkibi" />
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Jami</span>
                  <span className="text-sm font-medium text-gray-900">{classData.studentCount || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">O'g'il bolalar</span>
                  <span className="text-sm font-medium text-gray-900">{classData.boys || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Qiz bolalar</span>
                  <span className="text-sm font-medium text-gray-900">{classData.girls || 0}</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Davomat statistikasi" />
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Davomat darajasi</span>
                  <Badge variant={attendanceRate >= 80 ? 'success' : attendanceRate >= 60 ? 'warning' : 'danger'}>
                    {formatPercentage(attendanceRate)}
                  </Badge>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === 'students' && (
        <Card>
          <CardHeader title="O'quvchilar ro'yxati" />
          <CardBody>
            {!students || students.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">O'quvchilar topilmadi</p>
              </div>
            ) : (
              <div className="space-y-2">
                {students.slice(0, 10).map((student: any) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar name={student.fullName} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{student.fullName}</p>
                        <p className="text-xs text-gray-500">{student.gender === 'MALE' ? "O'g'il" : 'Qiz'}</p>
                      </div>
                    </div>
                    <Badge variant={student.gender === 'MALE' ? 'primary' : 'info'}>
                      {student.gender === 'MALE' ? "O'g'il" : 'Qiz'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {activeTab === 'attendance' && (
        <Card>
          <CardHeader title="Davomat tarixi" />
          <CardBody>
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Davomat ma'lumotlari tez orada qo'shiladi</p>
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