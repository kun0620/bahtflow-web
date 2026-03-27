import { useAuth } from '../hooks/useAuth'
import { authService } from '../services/authService'
import { Icon } from '../components/ui/Icon'
import { useNavigate } from 'react-router-dom'

export function ProfilePage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await authService.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-surface pb-32 md:pb-10">
      <header className="flex justify-between items-center w-full px-6 h-16 bg-surface sticky top-0 z-40">
        <h1 className="text-xl font-bold text-primary font-headline">Profile</h1>
      </header>

      <main className="max-w-lg mx-auto px-6 pt-6 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center py-8 gap-4">
          <div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center shadow-editorial">
            <Icon name="person" className="text-on-primary-container" size={48} filled />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-on-surface font-headline">{user?.user_metadata?.name || 'User'}</h2>
            <p className="text-sm text-on-surface-variant">{user?.email}</p>
          </div>
        </div>

        {/* Menu items */}
        <div className="space-y-2">
          {[
            { icon: 'notifications', label: 'Notifications' },
            { icon: 'security', label: 'Security' },
            { icon: 'language', label: 'Language' },
            { icon: 'help', label: 'Help & Support' },
          ].map(item => (
            <button key={item.label} className="w-full flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl hover:bg-surface-container transition-colors text-left">
              <Icon name={item.icon} className="text-primary" size={22} />
              <span className="text-sm font-medium text-on-surface flex-1">{item.label}</span>
              <Icon name="chevron_right" className="text-outline" size={20} />
            </button>
          ))}
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center justify-center gap-3 p-4 bg-error-container text-on-error-container rounded-2xl font-semibold hover:opacity-90 transition-all active:scale-95"
        >
          <Icon name="logout" size={20} />
          <span>Sign Out</span>
        </button>
      </main>
    </div>
  )
}
