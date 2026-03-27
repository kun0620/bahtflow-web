import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { Icon } from '../components/ui/Icon'

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await authService.resetPassword(email)
      setSent(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md bg-surface-container-low rounded-3xl p-8 shadow-editorial">
        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <Icon name="arrow_back" size={18} />
          Back to login
        </button>

        <h1 className="mt-4 text-3xl font-extrabold font-headline text-primary">Reset Password</h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Enter your account email and we will send a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="name@example.com"
            className="w-full h-12 bg-surface-container-high rounded-xl px-4 outline-none focus:bg-surface-container-highest"
          />

          {error && <div className="bg-error-container text-on-error-container text-sm px-4 py-3 rounded-xl">{error}</div>}
          {sent && (
            <div className="bg-secondary-container text-on-secondary-container text-sm px-4 py-3 rounded-xl">
              Reset link sent. Please check your inbox.
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary text-on-primary rounded-full font-bold disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>
      </div>
    </div>
  )
}
