// src/layout/Topbar.tsx
import { useLocation } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/add': 'New Entry',
  '/history': 'Transaction History',
  '/profile': 'Profile',
}

export default function Topbar() {
  const location = useLocation()
  const pageTitle = PAGE_TITLES[location.pathname] || 'Dashboard'

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-surface sticky top-0 border-b border-outline-variant/20">

      <h1 className="text-xl font-semibold text-on-surface font-headline">
        {pageTitle}
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full text-sm text-on-surface font-medium">
          <Icon name="calendar_today" size={16} className="text-on-surface-variant" />
          {dateStr}
        </div>

        <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
          <Icon name="notifications" size={20} className="text-on-surface-variant" />
        </button>

        <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
          <Icon name="settings" size={20} className="text-on-surface-variant" />
        </button>
      </div>
    </header>
  )
}