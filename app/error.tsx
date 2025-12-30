'use client'
 
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to home page after 2 seconds
    const timeout = setTimeout(() => {
      router.push('/')
    }, 10)

    return () => clearTimeout(timeout)
  }, [router])
 
  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-[#d4a574] mb-4">Oops! Something went wrong</h2>
        <p className="text-white mb-2">We apologize for the inconvenience.</p>
        <p className="text-[#d4a574]">Redirecting to home page...</p>
      </div>
    </div>
  )
}