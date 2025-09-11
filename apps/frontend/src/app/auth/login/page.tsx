'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  
  useEffect(() => {
    // Call login with no arguments as expected by auth hook
    login()
    router.push('/')
  }, [router, login])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  )
}