'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { User, Calendar, BookOpen, Clock, Users, Mail, Phone, Award } from 'lucide-react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Tabs, TabItem } from '@/components/ui/Tabs'
import { useTeachers } from '@/services/teacher.service'
import { formatDate } from '@/lib/utils/format'

export default function TeacherProfilePage() {
  const params = useParams()
  const teacherId = params.id as string
  const [activeTab, setActiveTab] = useState('profile')

  const { data: teacher, isLoading: teacherLoading } = useTeachers().useOne(teacherId)

  const tabs: TabItem[] = [
    { id: 'profile', label: 'Profil', icon: <User className="w-4 h-4" /> },
    { id: 'subjects', label: 'Fanlar', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'classes', label: 'Sinflar', icon: <Users className="w-4 h-4" /> },
    { id: 'schedule', label: 'Jadval', icon: <Clock className="w-4 h-4" /> },
  ]

  if (teacherLoading) {
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

  if (!teacher) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">O'qituvchi topilmadi</h3>
            <p className="text-sm text-gray-500">Kerakli o'qituvchi ma'lumotlari mavjud emas</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">O'qituvchi profili</h1>
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
            <Avatar name={teacher.user?.fullName || 'N/A'} size="xl" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {teacher.user?.fullName || 'N/A'}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{teacher.position}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{teacher.user?.email || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span>{teacher.subject || 'Fan belgilanmagan'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{teacher.joinedYear} yilda ishga kirgan</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Badge variant={teacher.status === 'ACTIVE' ? 'success' : 'warning'}>
                  {teacher.status === 'ACTIVE' ? 'Faol' : 'Nofaol'}
                </Badge>
                {teacher.workload && (
                  <Badge variant={
                    teacher.workload.status === 'NORMAL' ? 'success' :
                    teacher.workload.status === 'HEAVY' ? 'warning' :
                    'danger'
                  }>
                    Yuklama: {teacher.workload.weeklyHours}/{teacher.workload.maxHours} soat
                  </Badge>
                )}
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
                  <p className="text-sm font-medium text-gray-900">
                    {teacher.user?.fullName || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Lavozim</p>
                  <p className="text-sm font-medium text-gray-900">{teacher.position}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fan</p>
                  <p className="text-sm font-medium text-gray-900">{teacher.subject || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefon</p>
                  <p className="text-sm font-medium text-gray-900">{teacher.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ishga kirgan yil</p>
                  <p className="text-sm font-medium text-gray-900">{teacher.joinedYear}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Workload */}
          {teacher.workload && (
            <Card>
              <CardHeader title="Yuklama ma'lumotlari" />
              <CardBody>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Haftalik soatlar</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {teacher.workload.weeklyHours}/{teacher.workload.maxHours}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Holat</p>
                    <Badge variant={
                      teacher.workload.status === 'NORMAL' ? 'success' :
                      teacher.workload.status === 'HEAVY' ? 'warning' :
                      'danger'
                    }>
                      {teacher.workload.status}
                    </Badge>
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
                  <span className="text-sm text-gray-500">Ish staji</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date().getFullYear() - teacher.joinedYear} yil
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Oylik maosh</span>
                  <span className="text-sm font-medium text-gray-900">
                    {teacher.salaryBase.toLocaleString()} so'm
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      {activeTab === 'subjects' && (
        <Card>
          <CardHeader title="O'qitiladigan fanlar" />
          <CardBody>
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">
                {teacher.subject || 'Fanlar ma\'lumotlari tez orada qo\'shiladi'}
              </p>
            </div>
          </CardBody>
        </Card>
      )}

      {activeTab === 'classes' && (
        <Card>
          <CardHeader title="Biriktirilgan sinflar" />
          <CardBody>
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Sinf ma'lumotlari tez orada qo'shiladi</p>
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