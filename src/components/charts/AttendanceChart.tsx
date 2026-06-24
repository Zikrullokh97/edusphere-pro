'use client'

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export interface AttendanceChartProps {
  data: Array<{
    date: string
    present: number
    absent: number
    late: number
  }>
  height?: number
}

export function AttendanceChart({ data, height = 300 }: AttendanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickLine={{ stroke: '#e5e7eb' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#fff', 
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="present" 
          stroke="#10b981" 
          strokeWidth={2}
          dot={{ fill: '#10b981', r: 4 }}
          activeDot={{ r: 6 }}
          name="Kelgan"
        />
        <Line 
          type="monotone" 
          dataKey="absent" 
          stroke="#ef4444" 
          strokeWidth={2}
          dot={{ fill: '#ef4444', r: 4 }}
          activeDot={{ r: 6 }}
          name="Kelmagan"
        />
        <Line 
          type="monotone" 
          dataKey="late" 
          stroke="#f59e0b" 
          strokeWidth={2}
          dot={{ fill: '#f59e0b', r: 4 }}
          activeDot={{ r: 6 }}
          name="Kech qolgan"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}