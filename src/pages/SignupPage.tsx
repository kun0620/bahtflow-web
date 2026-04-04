// src/pages/SignupPage.tsx
import { useState } from 'react'
import { signup } from '@/modules/auth/auth.service'
import { useNavigate, Link } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'

export function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await signup(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-sm bg-surface-lowest rounded-xl shadow-soft p-8 space-y-6">
        {/* Logo Mark */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="account_balance" size={28} className="text-primary" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-on-surface font-headline">Create Account</h1>
          <p className="text-sm text-on-surface-variant">Join your financial sanctuary</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
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

            <input
              className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 rounded-full font-bold font-headline hover:bg-primary-container disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'Creating account...' : (
              <>
                Sign up
                <Icon name="arrow_forward" size={18} className="text-on-primary" />
              </>
            )}
          </button>
        </form>

        {/* Links */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-on-surface-variant hover:underline"
          >
            Cancel
          </button>
          <span className="text-outline-variant">•</span>
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
