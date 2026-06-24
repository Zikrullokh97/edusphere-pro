import React from 'react'
import { Card } from './Card'

export interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height 
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-gray-200'
  
  const variants = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%'),
  }

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={style}
    />
  )
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex gap-4 mb-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 mb-3">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-12 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant="text" width={200} height={24} />
        <Skeleton variant="rectangular" width={100} height={36} />
      </div>
      <div className="space-y-3">
        <Skeleton variant="text" width="100%" height={16} />
        <Skeleton variant="text" width="80%" height={16} />
        <Skeleton variant="text" width="60%" height={16} />
      </div>
    </Card>
  )
}

export function StatCardSkeleton() {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton variant="text" width={120} height={14} className="mb-2" />
          <Skeleton variant="text" width={80} height={32} />
        </div>
        <Skeleton variant="circular" width={48} height={48} />
      </div>
    </Card>
  )
}