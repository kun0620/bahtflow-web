import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { Icon } from '../components/ui/Icon'

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await authService.signIn(email, password)
      navigate('/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Background blur blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-gradient-to-b from-surface-container-high/50 to-transparent -z-10 rounded-[100%] blur-3xl pointer-events-none" />

      <div className="w-full max-w-md flex flex-col">
        {/* Logo */}
        <header className="flex flex-col items-center mb-12 space-y-4">
          <div className="w-20 h-20 bg-primary-container rounded-3xl flex items-center justify-center shadow-lg shadow-primary/10">
            <Icon name="account_balance_wallet" className="text-on-primary-container text-4xl" filled size={40} />
          </div>
          <div className="text-center">
            <h1 className="font-headline text-3xl font-extrabold text-primary tracking-tight">Siam Ledger</h1>
            <p className="text-on-surface-variant text-sm font-medium mt-1">Your Financial Sanctuary</p>
          </div>
        </header>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="space-y-2 group">
            <label className="font-label text-xs font-semibold text-primary uppercase tracking-widest px-1" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full h-14 bg-surface-container-high border-none border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-xl px-4 pr-12 text-on-surface font-medium placeholder:text-outline/50 transition-all duration-200 outline-none focus:bg-surface-container-highest"
              />
              <Icon name="mail" className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/50" size={20} />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2 group">
            <label className="font-label text-xs font-semibold text-primary uppercase tracking-widest px-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-14 bg-surface-container-high border-none focus:ring-0 rounded-xl px-4 pr-12 text-on-surface font-medium placeholder:text-outline/50 transition-all duration-200 outline-none focus:bg-surface-container-highest"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 hover:text-primary transition-colors"
              >
                <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-error-container text-on-error-container text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-primary text-on-primary font-bold text-lg rounded-full shadow-float flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-60"
          >
            {loading ? (
              <span className="animate-spin"><Icon name="progress_activity" size={22} /></span>
            ) : (
              <><span>Login</span><Icon name="arrow_forward" size={20} /></>
            )}
          </button>
        </form>

        {/* Sign up */}
        <p className="text-center text-sm text-on-surface-variant mt-8">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="font-bold text-primary hover:underline"
          >
            Create account
          </button>
        </p>

        <p className="text-center text-[10px] text-outline/50 uppercase tracking-widest mt-10">
          Secure Encryption • Siam Ledger
        </p>
      </div>
    </div>
  )
}
