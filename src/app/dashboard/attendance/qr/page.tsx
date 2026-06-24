'use client'

import { useState, useEffect } from 'react'
import { QrCode, CheckCircle, XCircle, Clock, Copy, RefreshCw } from 'lucide-react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useAttendance } from '@/services/attendance.service'
import { useClasses } from '@/services/class.service'
import { toast } from 'react-hot-toast'

export default function QrAttendancePage() {
  const [selectedClass, setSelectedClass] = useState('')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [sessionActive, setSessionActive] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)
  const [scannedStudents, setScannedStudents] = useState<any[]>([])

  const { data: classes } = useClasses().useAll()
  const qrScanMutation = useAttendance().useQrScan()

  // Timer for session
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (sessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [sessionActive])

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Generate QR code (mock)
  const generateQrCode = () => {
    if (!selectedClass) {
      toast.error('Iltimos, sinfni tanlang')
      return
    }

    // In production, generate actual QR code with class ID and timestamp
    const mockQrCode = `QR-${selectedClass}-${Date.now()}`
    setQrCode(mockQrCode)
    setSessionActive(true)
    setSessionTime(0)
    setScannedStudents([])
    toast.success('QR kod yaratildi')
  }

  // Stop session
  const stopSession = () => {
    setSessionActive(false)
    setQrCode(null)
    setSessionTime(0)
  }

  // Simulate QR scan
  const simulateScan = () => {
    if (!sessionActive) return

    const mockStudent = {
      id: Math.random().toString(36).substr(2, 9),
      name: `O'quvchi ${scannedStudents.length + 1}`,
      time: new Date().toLocaleTimeString('uz-UZ'),
    }

    setScannedStudents(prev => [...prev, mockStudent])
    toast.success(`${mockStudent.name} qo'shildi`)
  }

  // Copy QR code
  const copyQrCode = () => {
    if (qrCode) {
      navigator.clipboard.writeText(qrCode)
      toast.success('QR kod nusxalandi')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">QR kod orqali davomat</h1>
        <p className="text-sm text-gray-500 mt-1">
          QR kod yaratish va skanerlash orqali davomat olish
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code Generation */}
        <Card>
          <CardHeader
            title="QR kod yaratish"
            subtitle="O'quvchilar uchun QR kod generatsiya qilish"
          />
          <CardBody>
            <div className="space-y-4">
              {/* Class Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Sinf <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={sessionActive}
                >
                  <option value="">Sinfni tanlang</option>
                  {classes?.map((cls: any) => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>

              {/* QR Code Display */}
              {qrCode && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="inline-block p-4 bg-white rounded-lg shadow-sm mb-4">
                    <QrCode className="w-48 h-48 text-gray-900" />
                  </div>
                  <p className="text-sm font-mono text-gray-600 mb-2">{qrCode}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyQrCode}
                    icon={<Copy className="w-4 h-4" />}
                  >
                    Nusxalash
                  </Button>
                </div>
              )}

              {/* Session Timer */}
              {sessionActive && (
                <div className="flex items-center justify-center gap-2 p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl font-mono font-bold text-blue-600">
                    {formatTime(sessionTime)}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                {!sessionActive ? (
                  <Button
                    variant="primary"
                    onClick={generateQrCode}
                    icon={<QrCode className="w-4 h-4" />}
                    className="flex-1"
                  >
                    QR kod yaratish
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    onClick={stopSession}
                    className="flex-1"
                  >
                    Sessiyani to'xtatish
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Scanned Students */}
        <Card>
          <CardHeader
            title="Skanerlangan o'quvchilar"
            subtitle={`${scannedStudents.length} ta qo'shildi`}
            action={
              sessionActive && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={simulateScan}
                  icon={<RefreshCw className="w-4 h-4" />}
                >
                  Test scan
                </Button>
              )
            }
          />
          <CardBody>
            {!sessionActive ? (
              <div className="text-center py-12">
                <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-sm text-gray-500">
                  QR kod yaratish uchun sinfni tanlang
                </p>
              </div>
            ) : scannedStudents.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-pulse" />
                <p className="text-sm text-gray-500">
                  O'quvchilarni skanerlashni kuting...
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {scannedStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {student.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant="success">Kelgan</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader title="QR davomat qo'llanmasi" />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Sinfni tanlang</h3>
              <p className="text-xs text-gray-500">
                Qaysi sinf uchun QR kod yaratishni tanlang
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-green-600">2</span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">QR kodni ko'rsating</h3>
              <p className="text-xs text-gray-500">
                O'quvchilar QR kodni telefonlari bilan skaner qilishadi
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-lg font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">Davomat avtomatik</h3>
              <p className="text-xs text-gray-500">
                O'quvchilar avtomatik ravishda davomatga yoziladilar
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}