'use client'

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export interface StudentPerformanceChartProps {
  data: Array<{
    name: string
    grade: number
    attendance: number
  }>
  height?: number
}

export function StudentPerformanceChart({ data, height = 300 }: StudentPerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
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
        <Bar 
          dataKey="grade" 
          fill="#3b82f6" 
          radius={[8, 8, 0, 0]}
          name="O'rtacha baho"
        />
        <Bar 
          dataKey="attendance" 
          fill="#10b981" 
          radius={[8, 8, 0, 0]}
          name="Davomat %"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}