// src/layout/Sidebar.tsx
import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'
import { useAuth } from '@/modules/auth/useAuth'

const NAV_ITEMS = [
  { path: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { path: '/add', icon: 'add_circle', label: 'Add Transaction' },
  { path: '/history', icon: 'history', label: 'History' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()

  const userName = user?.email?.split('@')[0] || 'User'

  return (
    <aside className="fixed w-64 h-screen bg-surface-container-low px-4 py-8 flex flex-col space-y-6 hidden md:flex">

      {/* Logo */}
      <div className="px-4 mb-6">
        <h1 className="text-xl font-extrabold text-primary font-headline">
          Siam Ledger
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary-container font-semibold">
          Financial Sanctuary
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-1">
        {NAV_ITEMS.map(item => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-white/50 border-r-4 border-primary text-primary font-bold'
                  : 'text-on-surface-variant font-medium hover:bg-white/30'
              }`}
            >
              <Icon
                name={item.icon}
                size={20}
                className={isActive ? 'text-primary' : 'text-on-surface-variant'}
              />
              <span className="text-sm">{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* User */}
      <div className="mt-auto px-4">
        <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Icon name="person" size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-xs font-bold text-on-surface capitalize">{userName}</p>
            <p className="text-[10px] text-on-surface-variant">
              Premium Member
            </p>
          </div>
        </div>
      </div>

    </aside>
  )
}