// src/pages/ProfilePage.tsx
import { useAuth } from '@/modules/auth/useAuth'
import { logout } from '@/modules/auth/auth.service'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'

export function ProfilePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
      navigate('/login')
    } catch (err: any) {
      alert(err.message || 'Failed to logout')
    } finally {
      setLoading(false)
    }
  }

  const userInitial = user?.email?.[0]?.toUpperCase() || 'U'

  return (
    <div className="max-w-lg mx-auto space-y-8">

      {/* User Card */}
      <div className="bg-surface-container-low rounded-2xl p-8 space-y-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <span className="text-3xl font-bold text-on-primary">{userInitial}</span>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-on-surface-variant mb-2">
              Email Address
            </p>
            <p className="text-lg font-semibold text-on-surface break-all">{user?.email}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-on-surface-variant mb-2">
              User ID
            </p>
            <p className="text-sm font-mono text-on-surface-variant break-all">{user?.id}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.15em] font-semibold text-on-surface-variant mb-2">
              Account Status
            </p>
            <div className="inline-flex items-center gap-2 bg-secondary-container text-secondary px-3 py-1 rounded-full text-sm font-medium">
              <Icon name="verified" size={16} className="text-secondary" />
              Premium Member
            </div>
          </div>
        </div>
      </div>

      {/* Settings Card */}
      <div className="bg-surface-container-low rounded-2xl p-8 space-y-3">
        <h3 className="text-lg font-bold text-on-surface font-headline mb-4">Preferences</h3>

        <button className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <Icon name="notifications" size={20} className="text-on-surface-variant" />
            <span className="font-medium text-on-surface">Notifications</span>
          </div>
          <Icon name="chevron_right" size={20} className="text-on-surface-variant group-hover:text-on-surface" />
        </button>

        <button className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <Icon name="security" size={20} className="text-on-surface-variant" />
            <span className="font-medium text-on-surface">Security</span>
          </div>
          <Icon name="chevron_right" size={20} className="text-on-surface-variant group-hover:text-on-surface" />
        </button>

        <button className="w-full px-4 py-3 bg-surface-container-lowest rounded-lg hover:bg-surface-container-high transition-colors flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <Icon name="help" size={20} className="text-on-surface-variant" />
            <span className="font-medium text-on-surface">Help & Support</span>
          </div>
          <Icon name="chevron_right" size={20} className="text-on-surface-variant group-hover:text-on-surface" />
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        disabled={loading}
        className="w-full px-6 py-3 bg-error-container text-error rounded-full font-bold font-headline hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
      >
        <Icon name="logout" size={20} className="text-error" />
        {loading ? 'Logging out...' : 'Logout'}
      </button>

      {/* Footer */}
      <div className="text-center text-xs text-on-surface-variant space-y-2">
        <p>© 2024 Siam Ledger - Financial Sanctuary</p>
        <div className="flex justify-center gap-4 text-[10px]">
          <button className="hover:underline">Privacy Policy</button>
          <span className="text-outline-variant">•</span>
          <button className="hover:underline">Terms of Service</button>
        </div>
      </div>

    </div>
  )
}
