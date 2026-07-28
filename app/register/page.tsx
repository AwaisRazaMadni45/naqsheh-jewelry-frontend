'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/auth-context'

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await register(name, email, password)
    setLoading(false)
    if (result.success) {
      router.push(redirectTo)
    } else {
      setError(result.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="w-full max-w-md">
        <h1 className="font-serif text-3xl mb-2 text-center">Create Account</h1>
        <p className="text-muted-foreground text-center mb-8">Sign up to complete your order</p>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-12 px-4 border border-border rounded-md focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 px-4 border border-border rounded-md focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full h-12 px-4 border border-border rounded-md focus:outline-none focus:border-gold"
            />
            <p className="text-xs text-muted-foreground mt-1">At least 6 characters</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gold text-white font-medium rounded-md hover:bg-gold-light transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <Link href={`/login?redirect=${encodeURIComponent(redirectTo)}`} className="text-gold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}