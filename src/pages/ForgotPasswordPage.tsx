// src/pages/ForgotPasswordPage.tsx
import { useState } from 'react'
import { resetPassword } from '@/modules/auth/auth.service'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    try {
      await resetPassword(email)
      setSuccess(true)
      setEmail('')
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-sm bg-surface-lowest rounded-xl shadow-soft p-8 space-y-6">
        {/* Lock Icon */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="lock" size={32} className="text-primary" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-on-surface font-headline">Forgot Password?</h1>
          <p className="text-sm text-on-surface-variant">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleReset} className="space-y-4">
          {error && (
            <div className="bg-error-container border border-error text-error px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-secondary-container border border-secondary text-secondary-container px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
              <Icon name="check_circle" size={18} className="text-secondary" />
              Check your email for a password reset link
            </div>
          )}

          <input
            className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/40 rounded-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Email address"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 rounded-full font-bold font-headline hover:bg-primary-container disabled:opacity-50 transition-colors"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
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
          <Link to="/login" className="text-primary font-bold hover:underline">
            Back to Login
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-on-surface-variant font-semibold uppercase tracking-[0.1em]">
          SIAM LEDGER · SECURE ACCESS
        </div>
      </div>
    </div>
  )
}
