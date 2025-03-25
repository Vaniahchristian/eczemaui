"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PatientLayout from '@/components/layout/patient-layout'

export default function PatientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is a patient
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth')
      return
    }

    const userData = JSON.parse(user)
    if (userData.role !== 'patient') {
      router.push('/')
      return
    }
  }, [router])

  return <PatientLayout>{children}</PatientLayout>
}
