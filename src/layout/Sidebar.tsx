// src/layout/Sidebar.tsx
export default function Sidebar() {
  return (
    <aside className="fixed w-64 h-screen bg-surface-low px-4 py-8 flex flex-col space-y-6">

      {/* Logo */}
      <div className="px-4 mb-6">
        <h1 className="text-lg font-extrabold text-primary">
          BahtFlow
        </h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary-container font-semibold">
          Financial Sanctuary
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-2">

        {/* Active */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-white/50 scale-[0.98]">

          <span className="text-sm">Dashboard</span>
        </div>

        {/* Others */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-container font-medium hover:bg-white/30 transition-all">
          <span className="text-sm">Add Transaction</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary-container font-medium hover:bg-white/30 transition-all">
          <span className="text-sm">History</span>
        </div>

      </div>

      {/* User */}
      <div className="mt-auto px-4">
        <div className="flex items-center gap-3 p-3 bg-surface-lowest rounded-xl">

          <div className="w-8 h-8 rounded-full bg-primary/20" />

          <div>
            <p className="text-xs font-bold">Gun</p>
            <p className="text-[10px] text-gray-400">
              Premium Plan
            </p>
          </div>

        </div>
      </div>

    </aside>
  )
}