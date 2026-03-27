import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { Icon } from '../components/ui/Icon'

export function SignupPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await authService.signUp(email, password, name)
      navigate('/dashboard')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-gradient-to-b from-surface-container-high/50 to-transparent -z-10 rounded-[100%] blur-3xl pointer-events-none" />

      <div className="w-full max-w-md flex flex-col">
        <header className="mb-12">
          <button onClick={() => navigate('/login')} className="mb-8 p-2 -ml-2 rounded-full hover:bg-surface-container transition-colors">
            <Icon name="arrow_back" className="text-primary" size={22} />
          </button>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface tracking-tight">Begin your journey</h1>
          <p className="text-on-surface-variant mt-2 leading-relaxed">Create your sanctuary for wealth</p>
        </header>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="font-label text-xs font-semibold text-primary uppercase tracking-widest px-1" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                className="w-full h-14 bg-surface-container-high border-none focus:ring-0 rounded-xl px-4 pr-12 text-on-surface font-medium placeholder:text-outline/50 transition-all outline-none focus:bg-surface-container-highest"
              />
              <Icon name="person" className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/50" size={20} />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="font-label text-xs font-semibold text-primary uppercase tracking-widest px-1" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@domain.com"
                required
                className="w-full h-14 bg-surface-container-high border-none focus:ring-0 rounded-xl px-4 pr-12 text-on-surface font-medium placeholder:text-outline/50 transition-all outline-none focus:bg-surface-container-highest"
              />
              <Icon name="mail" className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/50" size={20} />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="font-label text-xs font-semibold text-primary uppercase tracking-widest px-1" htmlFor="password">
              Create Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                minLength={8}
                className="w-full h-14 bg-surface-container-high border-none focus:ring-0 rounded-xl px-4 pr-12 text-on-surface font-medium placeholder:text-outline/50 transition-all outline-none focus:bg-surface-container-highest"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-outline/50 hover:text-primary">
                <Icon name={showPassword ? 'visibility_off' : 'visibility'} size={20} />
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-error-container text-on-error-container text-sm px-4 py-3 rounded-xl">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-primary text-on-primary font-bold text-lg rounded-full shadow-float flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-60"
          >
            {loading
              ? <span className="animate-spin"><Icon name="progress_activity" size={22} /></span>
              : <><span>Create Account</span><Icon name="arrow_forward" size={20} /></>
            }
          </button>
        </form>

        <p className="text-center text-sm text-on-surface-variant mt-8">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="font-bold text-primary hover:underline">Sign in</button>
        </p>
      </div>
    </div>
  )
}
