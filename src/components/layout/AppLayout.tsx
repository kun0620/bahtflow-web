import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { SideNav } from './SideNav'
import type { User } from '@supabase/supabase-js'

interface AppLayoutProps { user: User | null }

export function AppLayout({ user }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-surface">
      <SideNav user={user} />
      <main className="md:ml-64 pb-24 md:pb-0 min-h-screen">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
