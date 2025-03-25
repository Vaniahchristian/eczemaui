"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DoctorLayout from '@/components/layout/doctor-layout'

export default function DoctorRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is a doctor
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth')
      return
    }

    const userData = JSON.parse(user)
    if (userData.role !== 'doctor') {
      router.push('/')
      return
    }
  }, [router])

  return <DoctorLayout>{children}</DoctorLayout>
}
