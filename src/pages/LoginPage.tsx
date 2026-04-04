// src/pages/LoginPage.tsx
import { useState } from 'react'
import { login } from '@/modules/auth/auth.service'
import { useNavigate, Link } from 'react-router-dom'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-1/2 bg-surface-container-low flex-col items-center justify-center px-12 py-8">
        <div className="max-w-sm space-y-8">
          <div>
            <h2 className="text-4xl font-extrabold text-on-surface font-headline mb-4">
              Your Financial Sanctuary.
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Manage your expenses with simplicity and elegance. Track every transaction in your personal financial sanctuary.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/50 rounded-full px-4 py-2">
            <span className="text-2xl">✓</span>
            <span className="text-sm font-semibold text-on-surface">Trusted by 50k+ users</span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 bg-surface flex flex-col items-center justify-center px-6 md:px-12 py-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-on-surface font-headline mb-2">Welcome back</h1>
            <p className="text-sm text-on-surface-variant">Log in to your Financial Sanctuary</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-error-container border border-error text-error px-4 py-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <input
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />

              <input
                className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-on-primary py-3 rounded-full font-bold font-headline hover:bg-primary-container disabled:opacity-50 transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-outline-variant/30" />
            <span className="text-xs text-on-surface-variant font-medium">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-outline-variant/30" />
          </div>

          {/* Google Sign-in */}
          <button className="w-full px-4 py-3 border border-outline-variant/40 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors">
            <span className="text-xl">🔵</span>
            <span className="font-medium text-on-surface">Google</span>
          </button>

          {/* Links */}
          <div className="space-y-2 text-center text-sm">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-bold hover:underline">
                Create account
              </Link>
            </p>
            <p>
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] text-on-surface-variant space-y-1">
          <p>Financial Sanctuary · © 2024</p>
          <div className="flex justify-center gap-4 text-[10px]">
            <Link to="#" className="hover:underline">Privacy</Link>
            <Link to="#" className="hover:underline">Terms</Link>
            <Link to="#" className="hover:underline">Support</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
