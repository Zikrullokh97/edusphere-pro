'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, Pagination } from '@/components/ui/Table'
import { Modal, ConfirmModal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { useTeachers } from '@/services/teacher.service'
import { Teacher } from '@/services/teacher.service'
import { formatDate } from '@/lib/utils/format'
import { toast } from 'react-hot-toast'

export default function TeachersPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null)

  const { data: teachers, isLoading, error } = useTeachers().useAll({ search })

  const handleCreate = () => {
    setSelectedTeacher(null)
    setIsCreateModalOpen(true)
  }

  const handleEdit = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setIsEditModalOpen(true)
  }

  const handleDelete = (teacher: Teacher) => {
    setSelectedTeacher(teacher)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedTeacher) return
    toast.success('O\'qituvchi muvaffaqiyatli o\'chirildi')
    setIsDeleteModalOpen(false)
    setSelectedTeacher(null)
  }

  const columns = [
    {
      key: 'user',
      title: 'O\'qituvchi',
      render: (value: any) => (
        <div className="flex items-center gap-3">
          <Avatar name={value?.fullName} size="sm" />
          <div>
            <div className="font-medium text-gray-900">{value?.fullName}</div>
            <div className="text-xs text-gray-500">{value?.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'position',
      title: 'Lavozim',
      render: (value: string) => value || '-',
    },
    {
      key: 'subject',
      title: 'Fan',
      render: (value: string) => value || '-',
    },
    {
      key: 'phone',
      title: 'Telefon',
      render: (value: string) => value || '-',
    },
    {
      key: 'workload',
      title: 'Yuklama',
      render: (value: any) => (
        <Badge variant={value?.status === 'NORMAL' ? 'success' : value?.status === 'HEAVY' ? 'warning' : 'danger'}>
          {value?.weeklyHours || 0}/{value?.maxHours || 0} soat
        </Badge>
      ),
    },
    {
      key: 'status',
      title: 'Holat',
      render: (value: string) => <Badge variant={value === 'ACTIVE' ? 'success' : 'warning'}>{value}</Badge>,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">O'qituvchilar</h1>
          <p className="text-sm text-gray-500 mt-1">
            Barcha o'qituvchilar ro'yxati va boshqaruvi
          </p>
        </div>
        <Button onClick={handleCreate} icon={<Plus className="w-4 h-4" />}>
          Yangi o'qituvchi
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
          </div>
        </CardBody>
      </Card>

      {/* Teachers Table */}
      <Table
        columns={columns}
        data={teachers || []}
        loading={isLoading}
        error={error?.message}
        emptyMessage="O'qituvchilar topilmadi"
        rowKey="id"
        actions={{
          view: (teacher) => console.log('View', teacher),
          edit: handleEdit,
          delete: handleDelete,
        }}
      />

      {/* Pagination */}
      {teachers && teachers.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={5}
          onPageChange={setPage}
          totalItems={teachers.length}
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
        title={selectedTeacher ? 'O\'qituvchini tahrirlash' : 'Yangi o\'qituvchi qo\'shish'}
        subtitle={selectedTeacher ? 'O\'qituvchi ma\'lumotlarini o\'zgartiring' : 'Yangi o\'qituvchi ma\'lumotlarini kiriting'}
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
            <Button type="submit" form="teacher-form">
              {selectedTeacher ? 'Saqlash' : 'Qo\'shish'}
            </Button>
          </>
        }
      >
        <form id="teacher-form" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Ism Familiya"
              placeholder="Abdulla Avloniy"
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="abdulla@school.uz"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Telefon"
              type="tel"
              placeholder="+998 90 123 45 67"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Lavozim <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                <option value="">Lavozimni tanlang</option>
                <option value="O'qituvchi">O'qituvchi</option>
                <option value="O'quv ishlari bo'yicha direktor o'rinbosari">O'quv ishlari bo'yicha direktor o'rinbosari</option>
                <option value="Ma'naviy ma'sulyat">Ma'naviy ma'sulyat</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Fan"
              placeholder="Matematika"
            />
            <Input
              label="Ishga kirgan yil"
              type="number"
              placeholder="2020"
              required
            />
          </div>

          <Input
            label="Oylik maosh"
            type="number"
            placeholder="5000000"
            required
          />
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedTeacher(null)
        }}
        onConfirm={confirmDelete}
        title="O'qituvchini o'chirish"
        message={`${selectedTeacher?.user?.fullName} ni o'chirishni tasdiqlaysizmi? Bu amalni qaytarib bo'lmaydi.`}
        confirmText="O'chirish"
        variant="danger"
      />
    </div>
  )
}