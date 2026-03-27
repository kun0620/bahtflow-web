import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '../ui/Icon'

const NAV_ITEMS = [
  { path: '/dashboard', icon: 'dashboard',   label: 'Dashboard' },
  { path: '/history',   icon: 'history',     label: 'History'   },
  { path: '/add',       icon: 'add_circle',  label: 'Add'       },
  { path: '/profile',   icon: 'person',      label: 'Profile'   },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden">
      <div className="bg-surface/80 backdrop-blur-xl border-t border-outline-variant/20 px-4 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around h-16">
          {NAV_ITEMS.map(item => {
            const active = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-xl transition-all active:scale-90"
              >
                <div className={`p-1.5 rounded-xl transition-colors ${active ? 'bg-surface-container-highest' : ''}`}>
                  <Icon
                    name={item.icon}
                    filled={active}
                    className={active ? 'text-primary' : 'text-on-surface-variant'}
                    size={22}
                  />
                </div>
                <span className={`text-[10px] font-medium transition-colors ${active ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
