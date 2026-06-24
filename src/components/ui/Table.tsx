import React from 'react'
import { ChevronUp, ChevronDown, ChevronsUpDown, MoreVertical, Eye, Edit, Trash2 } from 'lucide-react'
import { Button } from './Button'
import { Badge } from './Badge'
import { Skeleton, TableSkeleton } from './Skeleton'
import { Card } from './Card'

export interface Column<T> {
  key: string
  title: string
  sortable?: boolean
  render?: (value: any, row: T, index: number) => React.ReactNode
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  error?: string
  emptyMessage?: string
  emptyIcon?: React.ReactNode
  onRowClick?: (row: T) => void
  actions?: {
    view?: (row: T) => void
    edit?: (row: T) => void
    delete?: (row: T) => void
  }
  rowKey: keyof T | ((row: T) => string)
}

export function Table<T>({
  columns,
  data,
  loading = false,
  error,
  emptyMessage = 'Ma\'lumot topilmadi',
  emptyIcon,
  onRowClick,
  actions,
  rowKey,
}: TableProps<T>) {
  const getRowKey = (row: T, index: number): string => {
    if (typeof rowKey === 'function') {
      return rowKey(row)
    }
    return String(row[rowKey])
  }

  if (error) {
    return (
      <Card>
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Xatolik yuz berdi</h3>
          <p className="text-sm text-gray-500 mb-4">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Qayta yuklash
          </Button>
        </div>
      </Card>
    )
  }

  if (loading) {
    return <TableSkeleton rows={5} columns={columns.length} />
  }

  if (data.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          {emptyIcon || (
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ma'lumot topilmadi</h3>
          <p className="text-sm text-gray-500">{emptyMessage}</p>
        </div>
      </Card>
    )
  }

  return (
    <Card padding="none">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-${column.align || 'left'} text-sm font-semibold text-gray-700 ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  style={{ width: column.width }}
                >
                  <div className={`flex items-center gap-2 ${column.align === 'right' ? 'justify-end' : column.align === 'center' ? 'justify-center' : ''}`}>
                    {column.title}
                    {column.sortable && (
                      <span className="text-gray-400">
                        <ChevronsUpDown className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Amallar
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={getRowKey(row, rowIndex)}
                className={`hover:bg-gray-50 transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 text-${column.align || 'left'} text-sm text-gray-900`}
                  >
                    {column.render 
                      ? column.render((row as any)[column.key], row, rowIndex)
                      : (row as any)[column.key] as React.ReactNode
                    }
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      {actions.view && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            actions.view!(row)
                          }}
                          className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Ko'rish"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {actions.edit && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            actions.edit!(row)
                          }}
                          className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Tahrirlash"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {actions.delete && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            actions.delete!(row)
                          }}
                          className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems?: number
  itemsPerPage?: number
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0)

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showPages = 5
    const half = Math.floor(showPages / 2)

    let start = Math.max(1, currentPage - half)
    let end = Math.min(totalPages, currentPage + half)

    if (currentPage <= half) {
      end = Math.min(totalPages, showPages)
    }
    if (currentPage >= totalPages - half) {
      start = Math.max(1, totalPages - showPages + 1)
    }

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
      <div className="text-sm text-gray-700">
        {totalItems && (
          <>
            <span className="font-medium">{startItem}</span>
            {' - '}
            <span className="font-medium">{endItem}</span>
            {' / '}
            <span className="font-medium">{totalItems}</span>
            {' ta natija'}
          </>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Oldingi
        </Button>
        
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition-colors ${
              page === currentPage
                ? 'bg-blue-600 text-white'
                : page === '...'
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Keyingi
        </Button>
      </div>
    </div>
  )
}