'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Search, Filter } from 'lucide-react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, Pagination } from '@/components/ui/Table'
import { Modal, ConfirmModal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { Skeleton, TableSkeleton } from '@/components/ui/Skeleton'
import { useStudents } from '@/services/student.service'
import { Student } from '@/services/student.service'
import { formatDate, formatPercentage } from '@/lib/utils/format'
import { toast } from 'react-hot-toast'

export default function StudentsPage() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const studentsQuery = useStudents()
  const { data: students, isLoading, error } = studentsQuery.useAll({ search, classId: selectedClass })
  const deleteMutation = studentsQuery.useDelete()

  const handleCreate = () => {
    setSelectedStudent(null)
    setIsCreateModalOpen(true)
  }

  const handleEdit = (student: Student) => {
    setSelectedStudent(student)
    setIsEditModalOpen(true)
  }

  const handleDelete = (student: Student) => {
    setSelectedStudent(student)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedStudent) return
    
    try {
      await deleteMutation.mutateAsync(selectedStudent.id)
      toast.success('O\'quvchi muvaffaqiyatli o\'chirildi')
      setIsDeleteModalOpen(false)
      setSelectedStudent(null)
    } catch (error) {
      toast.error('O\'chirishda xatolik yuz berdi')
    }
  }

  const columns = [
    {
      key: 'fullName',
      title: 'O\'quvchi',
      render: (value: string, row: Student) => (
        <div className="flex items-center gap-3">
          <Avatar name={value} size="sm" />
          <div>
            <div className="font-medium text-gray-900">{value}</div>
            <div className="text-xs text-gray-500">{row.id.slice(0, 8)}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'class',
      title: 'Sinf',
      render: (value: any) => value?.name || '-',
    },
    {
      key: 'phone',
      title: 'Telefon',
      render: (value: string) => value || '-',
    },
    {
      key: 'attendanceRate',
      title: 'Davomat',
      render: (value: number) => (
        <Badge variant={value && value >= 80 ? 'success' : value && value >= 60 ? 'warning' : 'danger'}>
          {formatPercentage(value)}
        </Badge>
      ),
    },
    {
      key: 'gender',
      title: 'Jins',
      render: (value: string) => (
        <Badge variant={value === 'MALE' ? 'primary' : 'info'}>
          {value === 'MALE' ? 'O\'g\'il' : 'Qiz'}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      title: 'Qo\'shilgan',
      render: (value: string) => formatDate(value, 'short'),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">O'quvchilar</h1>
          <p className="text-sm text-gray-500 mt-1">
            Barcha o'quvchilar ro'yxati va boshqaruvi
          </p>
        </div>
        <Button onClick={handleCreate} icon={<Plus className="w-4 h-4" />}>
          Yangi o'quvchi
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="sm:w-64">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Barcha sinflar</option>
                <option value="class1">5-A</option>
                <option value="class2">6-B</option>
                <option value="class3">7-V</option>
              </select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Students Table */}
      <Table
        columns={columns}
        data={students || []}
        loading={isLoading}
        error={error?.message}
        emptyMessage="O'quvchilar topilmadi"
        rowKey="id"
        actions={{
          view: (student) => console.log('View', student),
          edit: handleEdit,
          delete: handleDelete,
        }}
      />

      {/* Pagination */}
      {students && students.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={5}
          onPageChange={setPage}
          totalItems={students.length}
          itemsPerPage={10}
        />
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false)
          setIsEditModalOpen(false)
        }}
        title={selectedStudent ? 'O\'quvchini tahrirlash' : 'Yangi o\'quvchi qo\'shish'}
        subtitle={selectedStudent ? 'O\'quvchi ma\'lumotlarini o\'zgartiring' : 'Yangi o\'quvchi ma\'lumotlarini kiriting'}
        size="lg"
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                setIsCreateModalOpen(false)
                setIsEditModalOpen(false)
              }}
            >
              Bekor qilish
            </Button>
            <Button type="submit" form="student-form">
              {selectedStudent ? 'Saqlash' : 'Qo\'shish'}
            </Button>
          </>
        }
      >
        <form id="student-form" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Ism"
              placeholder="Ali"
              required
            />
            <Input
              label="Familiya"
              placeholder="Valiyev"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Tug'ilgan sana"
              type="date"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Jins <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="MALE">O'g'il</option>
                <option value="FEMALE">Qiz</option>
              </select>
            </div>
          </div>

          <Input
            label="Telefon"
            type="tel"
            placeholder="+998 90 123 45 67"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Sinf <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
              <option value="">Sinfni tanlang</option>
              <option value="class1">5-A</option>
              <option value="class2">6-B</option>
              <option value="class3">7-V</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Ota-ona
            </label>
            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="">Ota-onani tanlang</option>
              <option value="parent1">Valiyev Akmal</option>
              <option value="parent2">Karimov Bobur</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedStudent(null)
        }}
        onConfirm={confirmDelete}
        title="O'quvchini o'chirish"
        message={`${selectedStudent?.fullName} ni o'chirishni tasdiqlaysizmi? Bu amalni qaytarib bo'lmaydi.`}
        confirmText="O'chirish"
        variant="danger"
        loading={deleteMutation.isPending}
      />
    </div>
  )
}