// src/layout/Topbar.tsx
export default function Topbar() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-surface sticky top-0">

      <div className="flex items-center gap-2">
        <span className="text-primary font-bold">
          Overview
        </span>

        <span className="text-gray-400">/</span>

        <span className="text-sm text-gray-500">
          Monthly Ledger
        </span>
      </div>

      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2 bg-surface-low px-4 py-2 rounded-full text-sm text-primary">
          October 2023
        </div>

        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-surface-low">
            ⚙️
          </button>
        </div>

      </div>
    </header>
  )
}