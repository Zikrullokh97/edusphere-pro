import React from 'react'
import { User } from 'lucide-react'

export interface AvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Avatar({ src, alt, name, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getRandomColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-cyan-500',
    ]
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
    return colors[index]
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={`${sizes[size]} rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center text-white font-medium ${getRandomColor(name || 'User')} ${className}`}
    >
      {name ? getInitials(name) : <User className="w-1/2 h-1/2" />}
    </div>
  )
}

export interface AvatarGroupProps {
  users: Array<{ name: string; avatar?: string }>
  max?: number
  size?: 'sm' | 'md' | 'lg'
}

export function AvatarGroup({ users, max = 3, size = 'md' }: AvatarGroupProps) {
  const displayUsers = users.slice(0, max)
  const remaining = users.length - max

  const sizes = {
    sm: 'w-8 h-8 text-xs -ml-2',
    md: 'w-10 h-10 text-sm -ml-2',
    lg: 'w-12 h-12 text-base -ml-3',
  }

  return (
    <div className="flex items-center">
      {displayUsers.map((user, index) => (
        <div
          key={index}
          className={`${sizes[size]} rounded-full flex items-center justify-center text-white font-medium border-2 border-white ${
            user.avatar ? '' : 'bg-blue-500'
          }`}
          style={{ zIndex: displayUsers.length - index }}
          title={user.name}
        >
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
          )}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`${sizes[size]} rounded-full flex items-center justify-center text-white font-medium bg-gray-500 border-2 border-white`}
          style={{ zIndex: 0 }}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}