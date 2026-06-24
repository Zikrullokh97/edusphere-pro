'use client'

import { useState } from 'react'
import { Users, UserCheck, UserX, Clock, BookOpen, TrendingUp } from 'lucide-react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Skeleton, StatCardSkeleton } from '@/components/ui/Skeleton'
import { useStudents } from '@/services/student.service'
import { useTeachers } from '@/services/teacher.service'
import { useClasses } from '@/services/class.service'
import { useAttendance } from '@/services/attendance.service'
import { formatPercentage } from '@/lib/utils/format'
import { toast } from 'react-hot-toast'

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('week')

  // Fetch real data from APIs
  const { data: students, isLoading: studentsLoading, error: studentsError } = useStudents().useAll()
  const { data: teachers, isLoading: teachersLoading, error: teachersError } = useTeachers().useAll()
  const { data: classes, isLoading: classesLoading, error: classesError } = useClasses().useAll()
  const { data: attendanceStats } = useAttendance().useStats()

  const isLoading = studentsLoading || teachersLoading || classesLoading
  const hasError = studentsError || teachersError || classesError

  // Calculate stats
  const totalStudents = students?.length || 0
  const totalTeachers = teachers?.length || 0
  const totalClasses = classes?.length || 0
  const attendanceRate = attendanceStats?.attendanceRate || 0

  const statCards = [
    {
      title: 'Jami o\'quvchilar',
      value: totalStudents,
      icon: Users,
      color: 'blue',
      trend: '+12%',
    },
    {
      title: 'O\'qituvchilar',
      value: totalTeachers,
      icon: UserCheck,
      color: 'green',
      trend: '+5%',
    },
    {
      title: 'Sinflar',
      value: totalClasses,
      icon: BookOpen,
      color: 'purple',
      trend: '+2',
    },
    {
      title: 'Davomat darajasi',
      value: `${attendanceRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'orange',
      trend: '+3.2%',
    },
  ]

  if (hasError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Xatolik yuz berdi
          </p>
        </div>
        <Card>
          <CardBody>
            <div className="text-center py-12">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ma'lumotlarni yuklashda xatolik</h3>
              <p className="text-sm text-gray-500 mb-4">Iltimos, keyinroq qayta urinib ko'ring</p>
              <Button variant="primary" onClick={() => window.location.reload()}>
                Qayta yuklash
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Maktab boshqaruv paneli
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">Bu hafta</option>
            <option value="month">Bu oy</option>
            <option value="year">Bu yil</option>
          </select>
          <Button variant="primary">
            Hisobot yuklash
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          statCards.map((stat, index) => (
            <Card key={index}>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1 font-medium">{stat.trend}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                    stat.color === 'green' ? 'bg-green-100 text-green-600' :
                    stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Overview */}
        <Card>
          <CardHeader
            title="Davomat holati"
            subtitle="Oxirgi 7 kun"
            action={
              <Button variant="ghost" size="sm">
                Batafsil
              </Button>
            }
          />
          <CardBody>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton variant="text" height={24} />
                <Skeleton variant="text" height={24} />
                <Skeleton variant="text" height={24} />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <UserCheck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Kelgan</p>
                      <p className="text-xs text-gray-500">{attendanceStats?.presentDays || 0} kun</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-green-600">
                    {attendanceStats ? formatPercentage(attendanceStats.attendanceRate) : '0%'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <UserX className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Kelmagan</p>
                      <p className="text-xs text-gray-500">{attendanceStats?.absentDays || 0} kun</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-red-600">
                    {attendanceStats ? formatPercentage((attendanceStats.absentDays / attendanceStats.totalDays) * 100) : '0%'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Kech qolgan</p>
                      <p className="text-xs text-gray-500">{attendanceStats?.lateDays || 0} kun</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-yellow-600">
                    {attendanceStats ? formatPercentage((attendanceStats.lateDays / attendanceStats.totalDays) * 100) : '0%'}
                  </span>
                </div>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader
            title="So'nggi faollik"
            subtitle="Bugungi voqealar"
          />
          <CardBody>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Yangi o'quvchi qo'shildi</p>
                    <p className="text-xs text-gray-500">2 daqiqa oldin</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-600 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Davomat olingan</p>
                    <p className="text-xs text-gray-500">15 daqiqa oldin</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-600 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Yangi dars jadvali</p>
                    <p className="text-xs text-gray-500">1 soat oldin</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-600 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">To'lov amalga oshirildi</p>
                    <p className="text-xs text-gray-500">2 soat oldin</p>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader title="Tezkor amallar" />
        <CardBody>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button variant="secondary" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              O'quvchi qo'shish
            </Button>
            <Button variant="secondary" className="w-full">
              <UserCheck className="w-4 h-4 mr-2" />
              Davomat olish
            </Button>
            <Button variant="secondary" className="w-full">
              <BookOpen className="w-4 h-4 mr-2" />
              Dars jadvali
            </Button>
            <Button variant="secondary" className="w-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              Hisobotlar
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}