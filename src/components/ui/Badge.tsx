import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-cyan-100 text-cyan-800',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  }

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}

export interface StatusBadgeProps {
  status: string
  size?: 'sm' | 'md' | 'lg'
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const getStatusVariant = (status: string): BadgeProps['variant'] => {
    const normalizedStatus = (status ?? '').toLowerCase()
    
    if (['active', 'paid', 'present', 'done', 'resolved'].includes(normalizedStatus)) {
      return 'success'
    }
    if (['inactive', 'pending', 'absent', 'new', 'upcoming'].includes(normalizedStatus)) {
      return 'warning'
    }
    if (['overdue', 'cancelled', 'late', 'error', 'rejected'].includes(normalizedStatus)) {
      return 'danger'
    }
    if (['processing', 'in_progress', 'monitoring'].includes(normalizedStatus)) {
      return 'info'
    }
    
    return 'default'
  }

  return (
    <Badge variant={getStatusVariant(status)} size={size}>
      {status}
    </Badge>
  )
}