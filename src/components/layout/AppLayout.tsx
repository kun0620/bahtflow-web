// src/components/layout/AppLayout.tsx
import { Outlet } from 'react-router-dom'
import MainLayout from '@/layout/MainLayout'

export function AppLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
