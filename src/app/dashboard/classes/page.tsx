'use client'

import { useState } from 'react'
import { Plus, Search, Users } from 'lucide-react'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Table, Pagination } from '@/components/ui/Table'
import { Modal, ConfirmModal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { useClasses } from '@/services/class.service'
import { SchoolClass } from '@/services/class.service'
import { formatDate } from '@/lib/utils/format'
import { toast } from 'react-hot-toast'

export default function ClassesPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null)

  const { data: classes, isLoading, error } = useClasses().useAll({ search })

  const handleCreate = () => {
    setSelectedClass(null)
    setIsCreateModalOpen(true)
  }

  const handleEdit = (classItem: SchoolClass) => {
    setSelectedClass(classItem)
    setIsEditModalOpen(true)
  }

  const handleDelete = (classItem: SchoolClass) => {
    setSelectedClass(classItem)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!selectedClass) return
    toast.success('Sinf muvaffaqiyatli o\'chirildi')
    setIsDeleteModalOpen(false)
    setSelectedClass(null)
  }

  const columns = [
    {
      key: 'name',
      title: 'Sinf',
      render: (value: string, row: SchoolClass) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-xs text-gray-500">{row.room}</div>
        </div>
      ),
    },
    {
      key: 'classTeacher',
      title: 'O\'qituvchi',
      render: (value: string) => value || '-',
    },
    {
      key: 'studentCount',
      title: 'O\'quvchilar',
      render: (value: number) => (
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-gray-400" />
          <span>{value || 0}</span>
        </div>
      ),
    },
    {
      key: 'boys',
      title: 'O\'g\'illar',
      render: (value: number) => value || 0,
    },
    {
      key: 'girls',
      title: 'Qizlar',
      render: (value: number) => value || 0,
    },
    {
      key: 'attendanceRate',
      title: 'Davomat',
      render: (value: number) => (
        <Badge variant={value && value >= 80 ? 'success' : value && value >= 60 ? 'warning' : 'danger'}>
          {value ? `${value.toFixed(1)}%` : '-'}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sinflar</h1>
          <p className="text-sm text-gray-500 mt-1">
            Barcha sinflar ro'yxati va boshqaruvi
          </p>
        </div>
        <Button onClick={handleCreate} icon={<Plus className="w-4 h-4" />}>
          Yangi sinf
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

      {/* Classes Table */}
      <Table
        columns={columns}
        data={classes || []}
        loading={isLoading}
        error={error?.message}
        emptyMessage="Sinflar topilmadi"
        rowKey="id"
        actions={{
          view: (classItem) => console.log('View', classItem),
          edit: handleEdit,
          delete: handleDelete,
        }}
      />

      {/* Pagination */}
      {classes && classes.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={5}
          onPageChange={setPage}
          totalItems={classes.length}
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
        title={selectedClass ? 'Sinfni tahrirlash' : 'Yangi sinf qo\'shish'}
        subtitle={selectedClass ? 'Sinf ma\'lumotlarini o\'zgartiring' : 'Yangi sinf ma\'lumotlarini kiriting'}
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
            <Button type="submit" form="class-form">
              {selectedClass ? 'Saqlash' : 'Qo\'shish'}
            </Button>
          </>
        }
      >
        <form id="class-form" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Sinf nomi"
              placeholder="5-A"
              required
            />
            <Input
              label="Xona raqami"
              placeholder="101"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Sinf rahbari <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
              <option value="">O'qituvchini tanlang</option>
              <option value="teacher1">Abdulla Avloniy</option>
              <option value="teacher2">Malika Karimova</option>
              <option value="teacher3">Bobur Alimov</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedClass(null)
        }}
        onConfirm={confirmDelete}
        title="Sinfni o'chirish"
        message={`${selectedClass?.name} ni o'chirishni tasdiqlaysizmi? Bu amalni qaytarib bo'lmaydi.`}
        confirmText="O'chirish"
        variant="danger"
      />
    </div>
  )
}