import React from 'react'
import { Button } from './Button'

export interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon, title, description, action, secondaryAction }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">{description}</p>}
      {(action || secondaryAction) && (
        <div className="flex items-center justify-center gap-3">
          {secondaryAction && (
            <Button variant="secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          {action && (
            <Button variant="primary" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

export interface ErrorStateProps {
  title?: string
  description?: string
  error?: Error
  onRetry?: () => void
}

export function ErrorState({ 
  title = 'Xatolik yuz berdi', 
  description = 'Ma\'lumotlarni yuklashda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko\'ring.',
  error,
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-2">{description}</p>
      {error && (
        <p className="text-xs text-red-600 mb-4 font-mono bg-red-50 p-2 rounded">
          {error.message}
        </p>
      )}
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Qayta urinish
        </Button>
      )}
    </div>
  )
}

export interface LoadingStateProps {
  type?: 'spinner' | 'skeleton' | 'dots'
  text?: string
}

export function LoadingState({ type = 'spinner', text = 'Yuklanmoqda...' }: LoadingStateProps) {
  if (type === 'spinner') {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
        <p className="text-sm text-gray-500">{text}</p>
      </div>
    )
  }

  if (type === 'dots') {
    return (
      <div className="text-center py-12">
        <div className="flex items-center justify-center gap-1 mb-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <p className="text-sm text-gray-500">{text}</p>
      </div>
    )
  }

  return (
    <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  )
}