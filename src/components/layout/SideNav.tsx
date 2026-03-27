import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '../ui/Icon'
import { authService } from '../../services/authService'
import type { User } from '@supabase/supabase-js'

const NAV_ITEMS = [
  { path: '/dashboard', icon: 'dashboard',  label: 'Dashboard' },
  { path: '/add',       icon: 'add_circle', label: 'Add Transaction' },
  { path: '/history',   icon: 'history',    label: 'History' },
  { path: '/profile',   icon: 'person',     label: 'Profile' },
]

interface SideNavProps { user: User | null }

export function SideNav({ user }: SideNavProps) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <aside className="hidden md:flex flex-col fixed h-full w-64 bg-surface-container-low py-8 px-4 z-50">
      {/* Logo */}
      <div className="px-4 mb-10">
        <h1 className="font-headline text-lg font-extrabold text-primary tracking-tight">Siam Ledger</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-semibold">Financial Sanctuary</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(item => {
          const active = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${active
                  ? 'text-primary font-bold bg-surface-container-lowest border-r-4 border-primary scale-[0.98]'
                  : 'text-primary-container hover:bg-surface-container hover:text-primary'
                }`}
            >
              <Icon name={item.icon} filled={active} className={active ? 'text-primary' : 'text-on-surface-variant'} size={20} />
              <span className="font-body">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-4 pt-6 border-t border-outline-variant/20">
        <div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl">
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
            <Icon name="person" className="text-on-primary-container" size={18} filled />
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-xs font-bold truncate text-on-surface">{user?.user_metadata?.name || 'User'}</p>
            <p className="text-[10px] text-on-surface-variant truncate">{user?.email}</p>
          </div>
          <button
            onClick={() => authService.signOut()}
            className="p-1.5 rounded-lg hover:bg-surface-container transition-colors"
            title="Sign out"
          >
            <Icon name="logout" className="text-on-surface-variant" size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
