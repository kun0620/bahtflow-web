// src/layout/MainLayout.tsx
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function MainLayout({ children }: any) {
  return (
    <div className="flex bg-surface min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <div className="px-8 py-10">{children}</div>
      </div>
    </div>
  )
}