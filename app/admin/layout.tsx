"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/layout/admin-layout'

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is an admin
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/auth')
      return
    }

    const userData = JSON.parse(user)
    if (userData.role !== 'admin') {
      router.push('/')
      return
    }
  }, [router])

  return <AdminLayout>{children}</AdminLayout>
}
