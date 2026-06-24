'use client'

import { useState, useRef, useEffect } from 'react'
import { Camera, CheckCircle, XCircle, Loader2, User } from 'lucide-react'
import { Card, CardHeader, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useAttendance } from '@/services/attendance.service'
import { useClasses } from '@/services/class.service'
import { toast } from 'react-hot-toast'

type ScanStatus = 'idle' | 'scanning' | 'detected' | 'confirmed' | 'error'

export default function FaceIdAttendancePage() {
  const [selectedClass, setSelectedClass] = useState('')
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle')
  const [recognizedStudents, setRecognizedStudents] = useState<any[]>([])
  const [cameraError, setCameraError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { data: classes } = useClasses().useAll()
  const faceIdMutation = useAttendance().useFaceId()

  // Request camera permission
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setScanStatus('idle')
        setCameraError(null)
      }
    } catch (error) {
      setCameraError('Kameraga ruxsat berilmadi. Iltimos, kamera ruxsatlarini tekshiring.')
      console.error('Camera error:', error)
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
    setScanStatus('idle')
  }

  // Simulate face scanning
  const startScanning = async () => {
    if (!selectedClass) {
      toast.error('Iltimos, sinfni tanlang')
      return
    }

    setScanStatus('scanning')
    
    // Simulate scanning process
    setTimeout(() => {
      setScanStatus('detected')
      
      // Simulate face recognition
      setTimeout(() => {
        const mockStudents = [
          { id: '1', name: 'Ali Valiyev', confidence: 95 },
          { id: '2', name: 'Malika Karimova', confidence: 88 },
          { id: '3', name: 'Bobur Alimov', confidence: 92 },
        ]
        
        setRecognizedStudents(mockStudents)
        setScanStatus('confirmed')
        toast.success(`${mockStudents.length} ta o'quvchi aniqlangan`)
      }, 1500)
    }, 2000)
  }

  // Confirm attendance
  const confirmAttendance = async () => {
    if (!selectedClass || recognizedStudents.length === 0) return

    try {
      // In production, send actual image data
      const mockImageData = 'base64_encoded_image_data'
      
      await faceIdMutation.mutateAsync({
        classId: selectedClass,
        imageData: mockImageData,
      })

      toast.success('Davomat muvaffaqiyatli saqlandi')
      setScanStatus('idle')
      setRecognizedStudents([])
    } catch (error) {
      toast.error('Davomatni saqlashda xatolik')
      setScanStatus('error')
    }
  }

  // Reset scanning
  const resetScan = () => {
    setScanStatus('idle')
    setRecognizedStudents([])
    setCameraError(null)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  const getStatusBadge = () => {
    switch (scanStatus) {
      case 'scanning':
        return <Badge variant="warning">Skaner qo'llanilmoqda...</Badge>
      case 'detected':
        return <Badge variant="info">Yuz aniqlangan</Badge>
      case 'confirmed':
        return <Badge variant="success">Tasdiqlangan</Badge>
      case 'error':
        return <Badge variant="danger">Xatolik</Badge>
      default:
        return <Badge variant="default">Tayyor</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Yuzni aniqlash orqali davomat</h1>
        <p className="text-sm text-gray-500 mt-1">
          Kamera orqali avtomatik davomat olish
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Kamera"
              subtitle="O'quvchilarni yuzni aniqlash orqali ro'yxatga olish"
              action={getStatusBadge()}
            />
            <CardBody>
              {/* Class Selector */}
              <div className="mb-4">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={scanStatus === 'scanning' || scanStatus === 'detected'}
                >
                  <option value="">Sinfni tanlang</option>
                  {classes?.map((cls: any) => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>

              {/* Video Feed */}
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video mb-4">
                {cameraError ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-sm">{cameraError}</p>
                      <Button
                        variant="secondary"
                        className="mt-4"
                        onClick={startCamera}
                      >
                        Qayta urinish
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    
                    {/* Scanning Overlay */}
                    {scanStatus === 'scanning' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-center text-white">
                          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" />
                          <p className="text-lg font-medium">Yuzlar aniqlanmoqda...</p>
                        </div>
                      </div>
                    )}

                    {/* Face Detection Frame */}
                    {scanStatus === 'detected' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="border-4 border-green-500 rounded-lg w-48 h-48 animate-pulse" />
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                {scanStatus === 'idle' && (
                  <Button
                    variant="primary"
                    onClick={startCamera}
                    icon={<Camera className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Kamerani yoqish
                  </Button>
                )}

                {scanStatus === 'idle' && videoRef.current?.srcObject && (
                  <Button
                    variant="primary"
                    onClick={startScanning}
                    icon={<User className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Skanerni boshlash
                  </Button>
                )}

                {(scanStatus === 'scanning' || scanStatus === 'detected') && (
                  <Button
                    variant="danger"
                    onClick={resetScan}
                    className="flex-1"
                  >
                    Bekor qilish
                  </Button>
                )}

                {scanStatus === 'confirmed' && (
                  <>
                    <Button
                      variant="secondary"
                      onClick={resetScan}
                      className="flex-1"
                    >
                      Qayta skaner
                    </Button>
                    <Button
                      variant="success"
                      onClick={confirmAttendance}
                      icon={<CheckCircle className="w-4 h-4" />}
                      className="flex-1"
                      loading={faceIdMutation.isPending}
                    >
                      Tasdiqlash
                    </Button>
                  </>
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Recognized Students */}
        <div>
          <Card>
            <CardHeader
              title="Aniqlangan o'quvchilar"
              subtitle={`${recognizedStudents.length} ta aniqlangan`}
            />
            <CardBody>
              {scanStatus === 'idle' ? (
                <div className="text-center py-8">
                  <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">
                    Skanerni boshlang
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recognizedStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {student.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Ishonch: {student.confidence}%
                          </p>
                        </div>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>

          {/* Instructions */}
          <Card className="mt-4">
            <CardHeader title="Qo'llanma" />
            <CardBody>
              <div className="space-y-2 text-sm text-gray-600">
                <p>1. Sinfni tanlang</p>
                <p>2. Kamerani yoqing</p>
                <p>3. Skanerni boshlang</p>
                <p>4. O'quvchilarni aniqlashni kuting</p>
                <p>5. Tasdiqlang</p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}